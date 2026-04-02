import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ShippingAddress } from "../../types/payment";
import { PAYMENT_COLORS } from "../../constants/payment";

type Props = {
  address: ShippingAddress;
  selected: boolean;
  onSelect: () => void;
};

export default function ShippingAddressCard({
  address,
  selected,
  onSelect,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.title}>Shipping address</Text>

          <Text style={styles.line}>
            <Text style={styles.bold}>Country: </Text>
            {address.country}
          </Text>

          <Text style={styles.line}>
            <Text style={styles.bold}>City: </Text>
            {address.city}
          </Text>

          <Text style={styles.line}>
            <Text style={styles.bold}>State: </Text>
            {address.state}
          </Text>

          <Text style={styles.line}>
            <Text style={styles.bold}>Zip Code: </Text>
            {address.zipCode}
          </Text>

          <Text style={styles.line}>
            <Text style={styles.bold}>Full address: </Text>
            {address.fullAddress}
          </Text>
        </View>

        <TouchableOpacity style={styles.radioWrapper} onPress={onSelect}>
          <View style={[styles.radio, selected && styles.radioSelected]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: PAYMENT_COLORS.white,
    borderWidth: 1,
    borderColor: PAYMENT_COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: PAYMENT_COLORS.text,
  },
  line: {
    fontSize: 15,
    color: PAYMENT_COLORS.subText,
    marginBottom: 8,
    lineHeight: 22,
  },
  bold: {
    color: PAYMENT_COLORS.text,
    fontWeight: "600",
  },
  radioWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  radio: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: PAYMENT_COLORS.radio,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  radioSelected: {
    borderColor: PAYMENT_COLORS.green,
    backgroundColor: PAYMENT_COLORS.green,
  },
});