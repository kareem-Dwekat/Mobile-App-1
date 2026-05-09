import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

  const handleReviewPress = () => {
    const firstProduct = item.products[0];

    router.push({
      pathname: "/review-order",
      params: {
        id: item.id,
        title: firstProduct?.title ?? `Order #${item.id}`,
        description: firstProduct?.category ?? "Order review",
        price: String(firstProduct?.price ?? item.amount),
        image: firstProduct?.image ?? "",
      },
    });
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
          <View style={styles.products}>
            {item.products.map((product) => (
              <View style={styles.productRow} key={product.id}>
                <Image source={{ uri: product.image }} style={styles.productImage} />

                <View style={styles.productInfo}>
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text style={styles.productMeta}>
                    Qty: {product.qty} x ${product.price.toFixed(2)}
                  </Text>
                </View>

                <Text style={styles.productTotal}>
                  ${(product.qty * product.price).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.rowBetweenExpanded}>
            <Text>Order Amount</Text>
            <Text>${item.amount.toFixed(2)}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.reviewBtn}
              onPress={handleReviewPress}
            >
              <Text style={styles.btnText}>Order Review</Text>
            </TouchableOpacity>

            <TouchableOpacity
  style={styles.trackBtn}
  onPress={() => router.push("/track-order")}
>
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
    alignItems: "center",
  },
  rowBetweenExpanded: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
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
    overflow: "hidden",
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
  products: {
    marginTop: 12,
    gap: 10,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  productImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    color: "#111827",
    fontWeight: "600",
  },
  productMeta: {
    color: "#6b7280",
    marginTop: 2,
  },
  productTotal: {
    color: "#111827",
    fontWeight: "700",
  },
  reviewBtn: {
    backgroundColor: "#1c5ed6",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
    alignItems: "center",
  },
  trackBtn: {
    backgroundColor: "#ff6b00",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});


