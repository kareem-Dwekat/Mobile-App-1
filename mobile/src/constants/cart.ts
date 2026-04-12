import { CartItemType } from "../types/cart";

export const initialCartData: CartItemType[] = [
  {
    id: "1",
    title: "Classic Cotton Oxford Shirt",
    category: "Clothing",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1593032465171-8b1c2d0fcd0c?q=80&w=800",
    qty: 2,
  },
  {
    id: "2",
    title: "Slim Fit Denim Shirt",
    category: "Clothing",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1520975922203-b1a8b2d7b6c0?q=80&w=800",
    qty: 1,
  },
];