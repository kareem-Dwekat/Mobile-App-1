import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import OrdersHeader from "../../components/myOrdersComponents/OrdersHeader";
import OrdersTabs from "../../components/myOrdersComponents/OrdersTabs";
import OrderCard from "../../components/myOrdersComponents/OrderCard";

import { ordersTabs } from "../../constants/orders";
import { useOrders } from "../../hooks/useOrders";

const MyOrdersScreen = () => {
  const navigation = useNavigation();

  const {
    activeTab,
    setActiveTab,
    expandedOrderId,
    filteredOrders,
    toggleExpandedOrder,
  } = useOrders();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OrdersHeader onBack={() => navigation.goBack()} />

      <OrdersTabs
        tabs={ordersTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            item={item}
            isExpanded={expandedOrderId === item.id}
            onPress={() => toggleExpandedOrder(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default MyOrdersScreen;