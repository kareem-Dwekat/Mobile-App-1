import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";

import { auth } from "../config/firebaseConfig";
import { subscribeToOrders } from "../services/orders.service";
import { OrderItemType, OrdersTabType } from "../types/order";

export const useOrders = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedOrderId, setExpandedOrderId] = useState<string>("");

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid ?? null);
    });

    return () => unsubAuth();
  }, []);

  const { data: orders = [], isLoading: loading } = useQuery<
    OrderItemType[]
  >({
    queryKey: ["orders", userId],
    enabled: !!userId,

    queryFn: () =>
      new Promise<OrderItemType[]>((resolve) => {
        if (!userId) {
          resolve([]);
          return;
        }

        const unsubscribe = subscribeToOrders(userId, (data) => {
          resolve(data);
          unsubscribe();
        });
      }),
  });

  const tabs: OrdersTabType[] = useMemo(() => {
    const pendingCount = orders.filter(
      (o) => o.status === "Pending"
    ).length;

    const deliveredCount = orders.filter(
      (o) => o.status === "Delivered"
    ).length;

    const cancelledCount = orders.filter(
      (o) => o.status === "Cancelled"
    ).length;

    return [
      { key: "All", label: "All", count: orders.length },
      { key: "Pending", label: "Pending", count: pendingCount },
      { key: "Delivered", label: "Delivered", count: deliveredCount },
      { key: "Cancelled", label: "Cancelled", count: cancelledCount },
    ];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (activeTab === "All") return orders;

    return orders.filter(
      (order) => order.status === activeTab
    );
  }, [orders, activeTab]);

  const toggleExpandedOrder = (id: string) => {
    setExpandedOrderId((prev) =>
      prev === id ? "" : id
    );
  };

  return {
    loading,
    activeTab,
    setActiveTab,
    expandedOrderId,
    filteredOrders,
    toggleExpandedOrder,
    tabs,
  };
};