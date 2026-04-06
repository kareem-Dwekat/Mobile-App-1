import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="HomeScreen" />

        <Stack.Screen
          name="shipping-address"
          options={{ title: "Shipping Address", headerShown: true }}
        />
        <Stack.Screen name="payment" />
        <Stack.Screen name="add-product" />
      </Stack>

      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}