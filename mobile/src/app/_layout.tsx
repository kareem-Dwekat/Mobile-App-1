import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { CartProvider } from "../hooks/CartContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ActionSheetProvider>
          <CartProvider>
            <>
              <Stack
                screenOptions={{
                  headerShown: false,
                  headerTitleAlign: "center",
                }}
              >
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="payment" options={{ headerShown: false }} />
                <Stack.Screen
                  name="add-product"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ShippingAddressScreen"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="myOrders"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="payment-history"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="invoice"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="profile"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="product-detail"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(tabs)"
                  options={{ headerShown: false }}
                />
              </Stack>

              <StatusBar style="auto" />
            </>
          </CartProvider>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}