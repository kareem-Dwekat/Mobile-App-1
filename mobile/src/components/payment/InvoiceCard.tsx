import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { InvoiceCardProps } from "../../types/invoice";

const InvoiceCard = ({ item }: InvoiceCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoice Details</Text>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.label}>Order IDs</Text>
        <Text style={styles.value}>{item.orderIds || "N/A"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Items</Text>
        <Text style={styles.value}>{item.items || 0}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Order Date</Text>
        <Text style={styles.value}>{item.date || "N/A"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Invoice ID</Text>
        <Text style={styles.value}>{item.id || "N/A"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Payment Method</Text>
        <Text style={styles.value}>{item.paymentMethod || "N/A"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.value}>$ {item.amount || 0}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>VAT</Text>
        <Text style={styles.value}>$ 0</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{item.status || "N/A"}</Text>
      </View>
    </View>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },
  value: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
});