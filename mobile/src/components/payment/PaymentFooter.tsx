import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PAYMENT_COLORS } from "../../constants/payment";

type Props = {
  total: number;
  buttonTitle: string;
  onPay: () => void;
};

export default function PaymentFooter({
  total,
  buttonTitle,
  onPay,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total Payment</Text>
        <Text style={styles.totalValue}>{total.toFixed(2)} $</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPay}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  totalLabel: {
    fontSize: 17,
    color: PAYMENT_COLORS.subText,
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "700",
    color: PAYMENT_COLORS.text,
  },
  button: {
    backgroundColor: PAYMENT_COLORS.green,
    borderRadius: 10,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});