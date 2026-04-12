import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PaymentHistoryCardProps } from "../../types/paymentHistory";

const PaymentHistoryCard = ({
  item,
  onViewInvoice,
  onPrintInvoice,
}: PaymentHistoryCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.orderText}>Order IDs: {item.orderIds}</Text>
          <Text style={styles.amountText}>USD {item.amount}</Text>
        </View>

        <View style={styles.rightBox}>
          <Text style={styles.itemsText}>Items: {item.items}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>

      {item.paymentMethod ? (
        <View style={styles.methodRow}>
          <Text style={styles.methodLabel}>Payment Method</Text>
          <Text style={styles.methodValue}>{item.paymentMethod}</Text>
        </View>
      ) : null}

      {item.showActions ? (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.viewBtn} onPress={onViewInvoice}>
            <Text style={styles.viewBtnText}>View Invoice</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.printBtn} onPress={onPrintInvoice}>
            <Text style={styles.printBtnText}>Print Invoice</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default PaymentHistoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },
  amountText: {
    fontSize: 16,
    color: "#111827",
  },
  rightBox: {
    alignItems: "flex-end",
  },
  itemsText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: "#E8F7E8",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  statusText: {
    color: "#4CAF50",
    fontWeight: "700",
    textTransform: "lowercase",
  },
  methodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 18,
  },
  methodLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  methodValue: {
    fontSize: 15,
    color: "#111827",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },
  viewBtn: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  viewBtnText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
  printBtn: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F97316",
  },
  printBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});