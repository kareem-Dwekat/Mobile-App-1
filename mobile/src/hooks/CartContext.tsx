import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
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
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid ?? null);
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      return;
    }

    const unsubscribe = subscribeToCart(userId, (items) => {
      setCartItems(items);
    });

    return () => unsubscribe();
  }, [userId]);

  const addToCart = (items: CartItemType[]) => {
    if (!userId) return;
    addMultipleItemsToCartFirebase(userId, items);
  };

  const removeFromCart = (id: string) => {
    if (!userId) return;
    removeItemFromCartFirebase(userId, id);
  };

  const changeQty = (id: string, type: "inc" | "dec") => {
    if (!userId) return;

    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
    updateCartItemQuantity(userId, id, Math.max(1, newQty));
  };

  const clearCart = async () => {
    if (!userId) return false;
    return clearCartFirebase(userId);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, changeQty, clearCart, userId }}
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
