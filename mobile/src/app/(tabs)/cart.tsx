import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../hooks/CartContext";
import { CartItemType } from "../../types/cart";

export default function CartScreen() {
  const { cartItems, removeFromCart, changeQty } = useCart();

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  const renderItem = ({ item }: { item: CartItemType }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        <View style={styles.qtyBox}>
          <TouchableOpacity onPress={() => changeQty(item.id, "dec")}>
            <Text style={styles.qtyBtn}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.qty}</Text>

          <TouchableOpacity onPress={() => changeQty(item.id, "inc")}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.header}>My Cart</Text>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Your cart is empty</Text>
          }
        />

        <View style={styles.bottomBar}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total ({totalItems} items):</Text>
            <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.paymentBtn,
              cartItems.length === 0 && styles.paymentBtnDisabled,
            ]}
            onPress={() => router.push("/payment")}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.paymentText}>Proceed To Payment</Text>
          </TouchableOpacity>
        </View>
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
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 160,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#6B7280",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 14,
    marginRight: 14,
    backgroundColor: "#E5E7EB",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
  },
  qtyBox: {
    width: 150,
    height: 42,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  qtyBtn: {
    fontSize: 24,
    color: "#6B7280",
    fontWeight: "500",
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  deleteBtn: {
    marginLeft: 12,
    padding: 6,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  totalLabel: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  paymentBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentBtnDisabled: {
    opacity: 0.5,
  },
  paymentText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});