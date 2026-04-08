import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OrderCardProps } from "../../types/order";

const OrderCard = ({ item, isExpanded, onPress }: OrderCardProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return styles.pending;
      case "Delivered":
        return styles.delivered;
      case "Cancelled":
        return styles.cancelled;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.rowBetween}>
        <Text style={styles.bold}>Order ID: #{item.id}</Text>

        <View style={styles.rightSection}>
          <Text>Total Items: {item.items}</Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
            style={styles.arrow}
          />
        </View>
      </View>

      <View style={styles.rowBetween}>
        <Text>Date: {item.date}</Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {item.status}
        </Text>
      </View>

      {isExpanded && (
        <>
          <View style={styles.rowBetween}>
            <Text>Order Amount</Text>
            <Text>${item.amount}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.reviewBtn}>
              <Text style={styles.btnText}>Order Review</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.trackBtn}>
              <Text style={styles.btnText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  arrow: {
    marginLeft: 4,
  },
  bold: {
    fontWeight: "700",
  },
  status: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  pending: {
    backgroundColor: "#e6ebff",
  },
  delivered: {
    backgroundColor: "#efe6ff",
  },
  cancelled: {
    backgroundColor: "#ffe6e6",
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  reviewBtn: {
    backgroundColor: "#1c5ed6",
    padding: 10,
    borderRadius: 8,
  },
  trackBtn: {
    backgroundColor: "#ff6b00",
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
  },
});