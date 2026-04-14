import { CategoryItemType, ProductItemType } from "../types/home";

export const homeCategories: CategoryItemType[] = [
  { id: "1", name: "Vehicles", icon: "car-sport-outline" },
  { id: "2", name: "Phones", icon: "phone-portrait-outline" },
  { id: "3", name: "Electronics", icon: "desktop-outline" },
  { id: "4", name: "Furniture", icon: "bed-outline" },
  { id: "5", name: "Clothing", icon: "shirt-outline" },
  { id: "6", name: "Shoes", icon: "walk-outline" },
  { id: "7", name: "Books", icon: "book-outline" },
  { id: "8", name: "Gaming", icon: "game-controller-outline" },
  { id: "9", name: "Home", icon: "home-outline" },

];
export const featuredProducts: ProductItemType[] = [
  {
    id: "1",
    title: "Classic Cotton Oxford",
    image: "https://images.unsplash.com/photo-1593032465171-8bd3b0f0ff1c?q=80&w=800&auto=format&fit=crop",
    category: "Clothing",
    price: 190.01,
    oldPrice: 204,
    rating: 3.0,
    reviews: 1,
  },
  {
    id: "2",
    title: "Slim Fit Denim Shirt",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    category: "Clothing",
    price: 285,
    oldPrice: 299,
    rating: 4.5,
    reviews: 2,
  },
];