import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import InvoiceHeader from "../components/payment/InvoiceHeader";
import InvoiceCard from "../components/payment/InvoiceCard";
import { getPaymentHistoryById } from "../services/paymentHistory.service";

type InvoiceItem = {
  id: string;
  orderIds: string;
  items: number;
  amount: number;
  paymentMethod: string;
  status: string;
  date: string;
  title?: string;
  quantity?: number;
  price?: number;
  image?: string;
};

export default function InvoiceScreen() {
  const { paymentId } = useLocalSearchParams();

  const id = typeof paymentId === "string" ? paymentId : "";

  const { data: invoice, isLoading: loading } = useQuery<InvoiceItem | null>({
    queryKey: ["invoice", id],
    enabled: !!id,
    queryFn: async () => {
      const data: any = await getPaymentHistoryById(id);

      if (!data) return null;

      return {
        id: data.id,
        orderIds: Array.isArray(data.orderIds)
          ? data.orderIds.join(", ")
          : data.orderIds || "N/A",
        items: data.items || 0,
        amount: data.amount || 0,
        paymentMethod: data.paymentMethod || "N/A",
        status: data.status || "N/A",
        date: data.createdAt?.seconds
          ? new Date(data.createdAt.seconds * 1000).toLocaleDateString()
          : "N/A",
      };
    },
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <InvoiceHeader onBack={() => router.back()} />

        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : !invoice ? (
          <Text style={styles.emptyText}>Invoice not found</Text>
        ) : (
          <InvoiceCard item={invoice as any } />
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
  loader: {
    marginTop: 40,
  },
  emptyText: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
});