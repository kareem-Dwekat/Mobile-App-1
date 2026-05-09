import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PaymentHistoryCardProps } from "../../types/paymentHistory";

const PaymentHistoryCard = ({
  item,
  onViewInvoice,
  onPrintInvoice,
}: PaymentHistoryCardProps) => {
  const orderIdsText = Array.isArray(item.orderIds)
    ? item.orderIds.map((id) => `#${id}`).join(", ")
    : `#${item.orderIds}`;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.orderText}>Order IDs: {orderIdsText}</Text>
        <Text style={styles.itemsText}>Items: {item.items}</Text>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.amountText}>USD {item.amount}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.methodRow}>
        <Text style={styles.methodLabel}>Payment Method</Text>
        <Text style={styles.methodValue}>{item.paymentMethod || "stripe"}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.viewBtn} onPress={onViewInvoice}>
          <Text style={styles.viewBtnText}>View Invoice</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.printBtn} onPress={onPrintInvoice}>
          <Text style={styles.printBtnText}>Print Invoice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentHistoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    marginBottom: 14,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  itemsText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginLeft: 10,
  },
  amountRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  statusBadge: {
    backgroundColor: "#DFF4E5",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    color: "#37A05B",
    fontWeight: "700",
    fontSize: 13,
    textTransform: "lowercase",
  },
  methodRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  methodLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  methodValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    textTransform: "lowercase",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  viewBtn: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  viewBtnText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "700",
  },
  printBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DF5B52",
  },
  printBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});