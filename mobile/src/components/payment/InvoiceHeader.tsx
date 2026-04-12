import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InvoiceHeaderProps } from "../../types/invoice";

const InvoiceHeader = ({ onBack }: InvoiceHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </TouchableOpacity>

      <Text style={styles.title}>Invoice</Text>
    </View>
  );
};

export default InvoiceHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
});