import React, { createContext, useContext, useState } from "react";
import { CartItemType } from "../types/cart";

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (items: CartItemType[]) => void;
  removeFromCart: (id: string) => void;
  changeQty: (id: string, type: "inc" | "dec") => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addToCart = (items: CartItemType[]) => {
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
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const changeQty = (id: string, type: "inc" | "dec") => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
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