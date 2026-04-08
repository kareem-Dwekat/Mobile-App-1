import { Order, TabConfig } from "../types/order";

export const ordersData: Order[] = [
  { id: "0050", date: "07 Feb 2026", items: 1, amount: 120, status: "Delivered" },
  { id: "0051", date: "07 Feb 2026", items: 1, amount: 627.98, status: "Pending" },
  { id: "0052", date: "07 Feb 2026", items: 1, amount: 90, status: "Pending" },
  { id: "0053", date: "07 Feb 2026", items: 1, amount: 150, status: "Pending" },
  { id: "0054", date: "07 Feb 2026", items: 2, amount: 300, status: "Pending" },
  { id: "0055", date: "07 Feb 2026", items: 1, amount: 80, status: "Cancelled" },
];

export const ordersTabs: TabConfig[] = [
  { key: "All Orders", label: "All", count: ordersData.length },
  {
    key: "Pending Orders",
    label: "Pending",
    count: ordersData.filter((o) => o.status === "Pending").length,
  },
  {
    key: "Completed Orders",
    label: "Complete",
    count: ordersData.filter((o) => o.status === "Delivered").length,
  },
  {
    key: "Cancelled Orders",
    label: "Cancel",
    count: ordersData.filter((o) => o.status === "Cancelled").length,
  },
];