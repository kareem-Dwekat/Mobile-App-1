import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { subscribeToOrders } from "../services/orders.service";
import { OrderItemType, OrdersTabType } from "../types/order";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedOrderId, setExpandedOrderId] = useState<string>("");

  useEffect(() => {
    let unsubscribeOrders: (() => void) | undefined;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeOrders?.();
      unsubscribeOrders = undefined;

      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      unsubscribeOrders = subscribeToOrders(user.uid, (data) => {
        setOrders(data);
        setLoading(false);
      });
    });

    return () => {
      unsubscribeOrders?.();
      unsubAuth();
    };
  }, []);

  const tabs: OrdersTabType[] = useMemo(() => {
    const pendingCount = orders.filter((o) => o.status === "Pending").length;
    const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
    const cancelledCount = orders.filter((o) => o.status === "Cancelled").length;

    return [
      { key: "All", label: "All", count: orders.length },
      { key: "Pending", label: "Pending", count: pendingCount },
      { key: "Delivered", label: "Delivered", count: deliveredCount },
      { key: "Cancelled", label: "Cancelled", count: cancelledCount },
    ];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (activeTab === "All") return orders;
    return orders.filter((order) => order.status === activeTab);
  }, [orders, activeTab]);

  const toggleExpandedOrder = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? "" : id));
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
