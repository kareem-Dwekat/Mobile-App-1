import React from "react";
import { FlatList, StyleSheet, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import PaymentHistoryHeader from "../components/payment/PaymentHistoryHeader";
import PaymentHistoryCard from "../components/payment/PaymentHistoryCard";
import { paymentHistoryData } from "../constants/paymentHistory";
import { PaymentHistoryItemType } from "../types/paymentHistory";

export default function PaymentHistoryScreen() {
  const handleViewInvoice = (item: PaymentHistoryItemType) => {
    Alert.alert("View Invoice", `Invoice for order ${item.orderIds}`);
  };

  const handlePrintInvoice = (item: PaymentHistoryItemType) => {
    Alert.alert("Print Invoice", `Printing invoice for order ${item.orderIds}`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <PaymentHistoryHeader onBack={() => router.back()} />

        <FlatList
          data={paymentHistoryData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PaymentHistoryCard
              item={item}
              onViewInvoice={() => handleViewInvoice(item)}
              onPrintInvoice={() => handlePrintInvoice(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  listContent: {
    paddingBottom: 24,
  },
});