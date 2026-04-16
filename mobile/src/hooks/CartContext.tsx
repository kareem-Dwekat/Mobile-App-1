import React, { createContext, useContext, useEffect, useState } from "react";
import {
    addMultipleItemsToCartFirebase,
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Demo user للعرض
const DEMO_USER_ID = "demo-user-123";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // مزامنة مع Firebase عند التحميل
  useEffect(() => {
    const unsubscribe = subscribeToCart(DEMO_USER_ID, (items) => {
      if (items.length > 0) {
        setCartItems(items);
      }
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (items: CartItemType[]) => {
    // تحديث محلي
    setCartItems((prev) => {
      const updated = [...prev];

      items.forEach((newItem) => {
        const existingIndex = updated.findIndex((item) => item.id === newItem.id);

        if (existingIndex !== -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            qty: updated[existingIndex].qty + newItem.qty,
          };
        } else {
          updated.push(newItem);
        }
      });

      return updated;
    });

    // مزامنة مع Firebase (بالخلفية)
    addMultipleItemsToCartFirebase(DEMO_USER_ID, items);
  };

  const removeFromCart = (id: string) => {
    // تحديث محلي
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    
    // مزامنة مع Firebase (بالخلفية)
    removeItemFromCartFirebase(DEMO_USER_ID, id);
  };

  const changeQty = (id: string, type: "inc" | "dec") => {
    // تحديث محلي
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );

    // مزامنة مع Firebase (بالخلفية)
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
      updateCartItemQuantity(DEMO_USER_ID, id, newQty);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, changeQty }}>
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