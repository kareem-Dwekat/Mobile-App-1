import { CategoryItemType, ProductItemType } from "../types/home";

export const homeCategories: CategoryItemType[] = [
  { id: "1", name: "Men's", icon: "shirt-outline" },
  { id: "2", name: "Women'", icon: "woman-outline" },
  { id: "3", name: "Kids'", icon: "gift-outline" },
  { id: "4", name: "Seasons", icon: "bag-handle-outline" },
  { id: "5", name: "More", icon: "ellipsis-horizontal" },
];

export const featuredProducts: ProductItemType[] = [
  {
    id: "1",
    title: "Classic Cotton Oxford",
    image: "https://images.unsplash.com/photo-1593032465171-8bd3b0f0ff1c?q=80&w=800&auto=format&fit=crop",
    price: 190.01,
    oldPrice: 204,
    rating: 3.0,
    reviews: 1,
  },
  {
    id: "2",
    title: "Slim Fit Denim Shirt",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    price: 285,
    oldPrice: 299,
    rating: 4.5,
    reviews: 2,
  },
];