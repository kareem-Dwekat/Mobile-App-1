import React from "react";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your App</Text>
      <Text style={styles.subtitle}>Start building from here.</Text>

      <Link href="/ShippingAddressScreen" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Shipping Address</Text>
        </Pressable>
      </Link>

      <Link href="/login" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </Link>

      <Link href="/payment" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Payment</Text>
        </Pressable>
      </Link>

      <Link href="/add-product" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add Product</Text>
        </Pressable>
      </Link>

      <Link href="/(tabs)/myOrders" asChild>
        <Pressable style={styles.ordersButton}>
          <Text style={styles.buttonText}>My Orders</Text>
        </Pressable>
      </Link>

      <Link href="/(tabs)/profile" asChild>
        <Pressable style={styles.profileButton}>
          <Text style={styles.buttonText}>Profile</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111111",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 24,
    color: "#444444",
  },
  button: {
    width: "80%",
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#22C55E",
    alignItems: "center",
  },
  ordersButton: {
    width: "80%",
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F97316",
    alignItems: "center",
  },
  profileButton: {
    width: "80%",
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});