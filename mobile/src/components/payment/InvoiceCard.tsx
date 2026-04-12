import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { InvoiceCardProps } from "../../types/invoice";

const InvoiceCard = ({ item }: InvoiceCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.productRow}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.productInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.label}>Order Date</Text>
        <Text style={styles.value}>{item.orderDate}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Invoice ID</Text>
        <Text style={styles.value}>{item.invoiceId}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Payment Method</Text>
        <Text style={styles.value}>{item.paymentMethod}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.value}>$ {item.total}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>VAT</Text>
        <Text style={styles.value}>$ {item.vat}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{item.status}</Text>
      </View>
    </View>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 108,
    height: 108,
    borderRadius: 14,
    marginRight: 14,
    backgroundColor: "#E5E7EB",
  },
  productInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  quantity: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
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
  },
  label: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
});