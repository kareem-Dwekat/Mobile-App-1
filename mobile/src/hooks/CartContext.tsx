import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { auth } from "../config/firebaseConfig";
import {
  addMultipleItemsToCartFirebase,
  clearCartFirebase,
  removeItemFromCartFirebase,
  subscribeToCart,
  updateCartItemQuantity,
} from "../services/cart.service";
import { CartItemType } from "../types/cart";

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (items: CartItemType[]) => void;
  removeFromCart: (id: string) => void;
  changeQty: (id: string, type: "inc" | "dec") => void;
  clearCart: () => Promise<boolean>;
  userId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);

  const queryKey = ["cart", userId];

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid ?? null);
    });

    return () => unsubAuth();
  }, []);

  const { data: cartItems = [] } = useQuery<CartItemType[]>({
    queryKey,
    queryFn: async () => [],
    enabled: !!userId,
    initialData: [],
  });

  useEffect(() => {
    if (!userId) {
      queryClient.setQueryData(queryKey, []);
      return;
    }

    const unsubscribe = subscribeToCart(userId, (items) => {
      queryClient.setQueryData(queryKey, items);
    });

    return () => unsubscribe();
  }, [userId, queryClient]);

  const setCartItems = (
    updater: (prev: CartItemType[]) => CartItemType[]
  ) => {
    queryClient.setQueryData<CartItemType[]>(queryKey, (old = []) => {
      return updater(old);
    });
  };

  const addToCart = (items: CartItemType[]) => {
    if (!userId) return;

    addMultipleItemsToCartFirebase(userId, items);
  };

  const removeFromCart = (id: string) => {
    if (!userId) return;

    setCartItems((prev) => prev.filter((item) => item.id !== id));

    removeItemFromCartFirebase(userId, id);
  };

  const changeQty = (id: string, type: "inc" | "dec") => {
    if (!userId) return;

    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
    const finalQty = Math.max(1, newQty);

    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: finalQty } : i))
    );

    updateCartItemQuantity(userId, id, finalQty);
  };

  const clearCart = async () => {
    if (!userId) return false;

    setCartItems(() => []);

    return clearCartFirebase(userId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        changeQty,
        clearCart,
        userId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};