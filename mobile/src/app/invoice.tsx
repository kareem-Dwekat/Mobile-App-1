import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import InvoiceHeader from "../components/payment/InvoiceHeader";
import InvoiceCard from "../components/payment/InvoiceCard";
import { getPaymentHistoryById } from "../services/paymentHistory.service";

export default function InvoiceScreen() {
  const { paymentId } = useLocalSearchParams();

  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        if (!paymentId || typeof paymentId !== "string") {
          setInvoice(null);
          return;
        }

        const data: any = await getPaymentHistoryById(paymentId);

        if (!data) {
          setInvoice(null);
          return;
        }

        const invoiceData = {
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

        setInvoice(invoiceData);
      } catch (error) {
        console.log("Invoice error:", error);
        setInvoice(null);
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [paymentId]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <InvoiceHeader onBack={() => router.back()} />

        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : !invoice ? (
          <Text style={styles.emptyText}>Invoice not found</Text>
        ) : (
          <InvoiceCard item={invoice} />
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