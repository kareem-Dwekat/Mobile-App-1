import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Print from "expo-print";

import PaymentHistoryHeader from "../components/payment/PaymentHistoryHeader";
import PaymentHistoryCard from "../components/payment/PaymentHistoryCard";
import { paymentHistoryData } from "../constants/paymentHistory";
import { PaymentHistoryItemType } from "../types/paymentHistory";

export default function PaymentHistoryScreen() {
  

  const handleViewInvoice = (item: PaymentHistoryItemType) => {
    router.push("/invoice");
  };

  
  const handlePrintInvoice = async (item: PaymentHistoryItemType) => {
    try {
      const html = `
        <html>
          <body style="font-family: Arial; padding: 20px;">
            <h2>Invoice</h2>
            <p><strong>Order IDs:</strong> ${item.orderIds}</p>
            <p><strong>Items:</strong> ${item.items}</p>
            <p><strong>Total:</strong> $${item.amount}</p>
            <p><strong>Payment Method:</strong> ${item.paymentMethod || "stripe"}</p>
            <p><strong>Status:</strong> ${item.status}</p>
          </body>
        </html>
      `;
  
      await Print.printAsync({ html });
    } catch (error) {
      console.log("Print error:", error);
    }
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