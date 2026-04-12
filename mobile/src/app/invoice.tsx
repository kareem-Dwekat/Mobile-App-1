import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import InvoiceHeader from "../components/payment/InvoiceHeader";
import InvoiceCard from "../components/payment/InvoiceCard";
import { invoiceData } from "../constants/invoice";

export default function InvoiceScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <InvoiceHeader onBack={() => router.back()} />
        <InvoiceCard item={invoiceData} />
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
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});