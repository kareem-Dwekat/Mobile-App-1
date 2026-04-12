import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "../hooks/CartContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <>
          <Stack
            screenOptions={{
              headerShown: false,
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen
              name="login"
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen
              name="payment"
              options={{ title: "Payment", headerShown: false }}
            />
            <Stack.Screen
              name="add-product"
              options={{ title: "Add Product", headerShown: false }}
            />
            <Stack.Screen
              name="ShippingAddressScreen"
              options={{ title: "Shipping Address", headerShown: false }}
            />
            <Stack.Screen
              name="myOrders"
              options={{ title: "My Orders", headerShown: false }}
            />
            <Stack.Screen
              name="review-order"
              options={{ title: "Review Order", headerShown: false }}
            />
            <Stack.Screen
              name="track-order"
              options={{ title: "Track Order", headerShown: false }}
            />
             <Stack.Screen
              name="payment-history"
              options={{ title: "Payment History", headerShown: false }}
            />
              <Stack.Screen
              name="invoice"
              options={{ title: "invoice", headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>

          <StatusBar style="auto" />
        </>
      </CartProvider>
    </SafeAreaProvider>
  );
}