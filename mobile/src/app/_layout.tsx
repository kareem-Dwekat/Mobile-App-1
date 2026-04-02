import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />

        <Stack.Screen
          name="shipping-address"
          options={{ title: "Shipping Address" }}
        />

        <Stack.Screen
          name="payment"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="add-product"
          options={{ headerShown: false }}
        />
      </Stack>

      <StatusBar style="auto" />
    </>
  );
}