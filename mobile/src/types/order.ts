export type OrderStatus = "Pending" | "Delivered" | "Cancelled";

export interface OrderItemType {
  id: string;
  date: string;
  items: number;
  amount: number;
  status: OrderStatus;
}

export interface OrdersTabType {
  key: string;
  label: string;
  count: number;
}

export interface OrdersHeaderProps {
  onBack: () => void;
}

export interface OrdersTabsProps {
  tabs: OrdersTabType[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface OrderCardProps {
  item: OrderItemType;
  isExpanded: boolean;
  onPress: () => void;
}