import { StepItem } from "../types/addProduct";

export const ADD_PRODUCT_COLORS = {
  background: "#F8F8F8",
  white: "#FFFFFF",
  text: "#111111",
  subText: "#666666",
  border: "#E4E4E4",
  primary: "#FF6B2C",
  primaryLight: "#FFF1EA",
  placeholder: "#999999",
  error: "#EF4444",
  success: "#22C55E",
};

export const ADD_PRODUCT_STEPS: StepItem[] = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Details" },
  { id: 3, label: "Images" },
];