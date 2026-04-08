import { useMemo, useState } from "react";
import { ordersData } from "../constants/orders";
import { FilterTab } from "../types/order";

export const useOrders = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("All Orders");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      if (activeTab === "All Orders") return true;
      if (activeTab === "Pending Orders") return order.status === "Pending";
      if (activeTab === "Completed Orders") return order.status === "Delivered";
      if (activeTab === "Cancelled Orders") return order.status === "Cancelled";
      return false;
    });
  }, [activeTab]);

  const toggleExpandedOrder = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  return {
    activeTab,
    setActiveTab,
    expandedOrderId,
    filteredOrders,
    toggleExpandedOrder,
  };
};