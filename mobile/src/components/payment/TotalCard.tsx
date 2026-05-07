import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PaymentSummary } from "../../types/payment";
import { PAYMENT_COLORS } from "../../constants/payment";

type Props = {
  summary: PaymentSummary;
};

export default function TotalCard({ summary }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons name="credit-card" size={18} color={PAYMENT_COLORS.yellow} />
        <Text style={styles.title}>Total</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Products Total</Text>
        <Text style={styles.value}>
          {(summary.subtotal ?? summary.totalPayment).toFixed(2)} $
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>VAT</Text>
        <Text style={styles.value}>{summary.vat.toFixed(2)} $</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Shipping Costs</Text>
        <Text style={styles.value}>{summary.shippingCosts.toFixed(2)} $</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: PAYMENT_COLORS.white,
    borderWidth: 1,
    borderColor: PAYMENT_COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "700",
    color: PAYMENT_COLORS.text,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    color: PAYMENT_COLORS.subText,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: PAYMENT_COLORS.text,
  },
});
