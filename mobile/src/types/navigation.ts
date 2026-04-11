export type TabKey = "home" | "categories" | "cart" | "account";

export interface BottomNavBarProps {
  activeTab?: TabKey;
  cartCount?: number;
  onHomePress?: () => void;
  onCategoriesPress?: () => void;
  onCartPress?: () => void;
  onAccountPress?: () => void;
}