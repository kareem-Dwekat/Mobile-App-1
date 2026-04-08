import { CategoryItemType } from "../types/category";

export const categoryData: CategoryItemType[] = [
  {
    id: "1",
    title: "Men's Fashion",
    icon: "shirt-outline",
  },
  {
    id: "2",
    title: "Women's Fashion",
    icon: "woman-outline",
    children: [
      { id: "2-1", title: "Dresses & Gowns" },
      { id: "2-2", title: "Tops" },
    ],
  },
  {
    id: "3",
    title: "Kids' Fashion",
    icon: "gift-outline",
  },
  {
    id: "4",
    title: "Seasonal & Special",
    icon: "bag-handle-outline",
  },
  {
    id: "5",
    title: "Shoes",
    icon: "walk-outline",
  },
  {
    id: "6",
    title: "Pants",
    icon: "resize-outline",
  },
  {
    id: "7",
    title: "Hats",
    icon: "ellipse-outline",
  },
  {
    id: "8",
    title: "Shirt",
    icon: "remove-outline",
  },
  {
    id: "9",
    title: "Hoddie",
    icon: "shirt-outline",
  },
  {
    id: "10",
    title: "Eyeglasses",
    icon: "glasses-outline",
  },
];