import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Address } from "../types/address";
import { COLORS } from "../constants/colors";
import { formatAddress } from "../utils/formatAddress";
import AppButton from "./ui/AppButton"

type AddressCardProps = {
  address: Address;
  onSetActive: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function AddressCard({
  address,
  onSetActive,
  onDelete,
}: AddressCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Ionicons name="location-outline" size={20} color={COLORS.primary} />
          <Text style={styles.title}>{address.title}</Text>

          {address.isActive && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.addressText}>{formatAddress(address)}</Text>

      <Text style={styles.zipText}>
        <Text style={styles.zipLabel}>Zip Code : </Text>
        {address.zipCode}
      </Text>

      {address.isActive && (
        <View style={styles.buttonRow}>
          <AppButton title="Active" variant="secondary" disabled />
          <View style={{ width: 14 }} />
          <AppButton
            title="Delete"
            variant="primary"
            onPress={() => onDelete(address.id)}
          />
        </View>
      )}

      {!address.isActive && (
        <View style={styles.singleButtonWrapper}>
          <AppButton
            title="Set Active"
            variant="secondary"
            onPress={() => onSetActive(address.id)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 18,
  },
  headerRow: {
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.text,
    marginLeft: 8,
  },
  badge: {
    backgroundColor: COLORS.badgeBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  addressText: {
    fontSize: 18,
    color: COLORS.subText,
    lineHeight: 28,
    marginBottom: 10,
  },
  zipText: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  zipLabel: {
    fontWeight: "700",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  singleButtonWrapper: {
    marginTop: 4,
  },
});