import React from "react";
import { FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import OrdersHeader from "../components/myOrdersComponents/OrdersHeader";
import OrdersTabs from "../components/myOrdersComponents/OrdersTabs";
import OrderCard from "../components/myOrdersComponents/OrderCard";

import { useOrders } from "../hooks/useOrders";

const MyOrdersScreen = () => {
  const {
    loading,
    tabs,
    activeTab,
    setActiveTab,
    expandedOrderId,
    filteredOrders,
    toggleExpandedOrder,
  } = useOrders();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <OrdersHeader onBack={() => router.back()} />

        <OrdersTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ff6b00" />
          </View>
        ) : (
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
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No orders found</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#6b7280",
    fontSize: 16,
  },
});