import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="login" options={{ title: "Login", headerShown: true }} />
        <Stack.Screen name="payment" options={{ title: "Payment", headerShown: true }} />
        <Stack.Screen name="add-product" options={{ title: "Add Product", headerShown: true }} />
        <Stack.Screen
          name="ShippingAddressScreen"
          options={{ title: "Shipping Address", headerShown: true }}
        />
        <Stack.Screen
          name="my-orders"
          options={{ title: "My Orders", headerShown: true }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </>
  );
}