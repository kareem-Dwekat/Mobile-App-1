export type OrderStatus = "Pending" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  date: string;
  items: number;
  amount: number;
  status: OrderStatus;
}

export type FilterTab =
  | "All Orders"
  | "Pending Orders"
  | "Completed Orders"
  | "Cancelled Orders";

export interface TabConfig {
  key: FilterTab;
  label: string;
  count: number;
}

export interface OrdersHeaderProps {
  onBack: () => void;
}

export interface OrdersTabsProps {
  tabs: TabConfig[];
  activeTab: FilterTab;
  setActiveTab: (tab: FilterTab) => void;
}

export interface OrderCardProps {
  item: Order;
  isExpanded: boolean;
  onPress: () => void;
}