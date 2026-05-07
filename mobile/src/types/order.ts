import { CartItemType } from "./cart";
import { PaymentMethod, ShippingAddress } from "./payment";

export type OrderStatus = "Pending" | "Delivered" | "Cancelled";

export interface OrderItemType {
  id: string;
  userId: string;
  date: string;
  items: number;
  amount: number;
  status: OrderStatus;
  products: CartItemType[];
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  createdAt: string;
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
