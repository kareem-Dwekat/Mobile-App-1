import { OrderItemType } from "../types/order";

export const initialOrders: OrderItemType[] = [
  {
    id: "1001",
    date: "2026-04-01",
    items: 2,
    amount: 120,
    status: "Pending",
  },
  {
    id: "1002",
    date: "2026-03-28",
    items: 1,
    amount: 80,
    status: "Delivered",
  },
  {
    id: "1003",
    date: "2026-03-20",
    items: 3,
    amount: 230,
    status: "Cancelled",
  },
  {
    id: "1004",
    date: "2026-03-15",
    items: 4,
    amount: 310,
    status: "Pending",
  },
];