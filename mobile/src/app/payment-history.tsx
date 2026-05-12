import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Print from "expo-print";
import { useQuery } from "@tanstack/react-query";

import PaymentHistoryHeader from "../components/payment/PaymentHistoryHeader";
import PaymentHistoryCard from "../components/payment/PaymentHistoryCard";

import { PaymentHistoryItemType } from "../types/paymentHistory";
import { useCart } from "../hooks/CartContext";
import { getPaymentHistory } from "../services/paymentHistory.service";

export default function PaymentHistoryScreen() {
  const { userId } = useCart();

  const {
    data: payments = [],
    isLoading: loading,
  } = useQuery<PaymentHistoryItemType[]>({
    queryKey: ["payment-history", userId],
    enabled: !!userId,

    queryFn: async () => {
      if (!userId) return [];

      const data = await getPaymentHistory(userId);

      console.log("Payment history data:", data);

      return data as PaymentHistoryItemType[];
    },
  });

  const handleViewInvoice = (item: PaymentHistoryItemType) => {
    router.push({
      pathname: "/invoice",
      params: {
        paymentId: item.id,
      },
    });
  };

  const handlePrintInvoice = async (
    item: PaymentHistoryItemType
  ) => {
    try {
      const orderIdsText = Array.isArray(item.orderIds)
        ? item.orderIds.join(", ")
        : item.orderIds;

      const html = `
        <html>
          <body style="font-family: Arial; padding: 20px;">
            <h2>Invoice</h2>
            <p><strong>Order IDs:</strong> ${orderIdsText}</p>
            <p><strong>Items:</strong> ${item.items}</p>
            <p><strong>Total:</strong> $${item.amount}</p>
            <p><strong>Payment Method:</strong> ${
              item.paymentMethod || "N/A"
            }</p>
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

        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : payments.length === 0 ? (
          <Text style={styles.emptyText}>
            No payment history found
          </Text>
        ) : (
          <FlatList
            data={payments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PaymentHistoryCard
                item={item}
                onViewInvoice={() =>
                  handleViewInvoice(item)
                }
                onPrintInvoice={() =>
                  handlePrintInvoice(item)
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
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

  loader: {
    marginTop: 40,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
});