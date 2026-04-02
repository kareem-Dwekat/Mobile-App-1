import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { PaymentMethod } from "../../types/payment";
import { PAYMENT_COLORS } from "../../constants/payment";

type Props = {
  id: PaymentMethod;
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function PaymentMethodCard({
  label,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selectedCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: PAYMENT_COLORS.white,
    borderWidth: 1,
    borderColor: PAYMENT_COLORS.border,
    borderRadius: 12,
    minHeight: 72,
    justifyContent: "center",
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: PAYMENT_COLORS.greenBorder,
    borderWidth: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F3A8A",
  },
});