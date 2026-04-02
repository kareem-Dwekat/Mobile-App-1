import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ADD_PRODUCT_COLORS } from "../../constants/addProduct";

type Props = {
  title: string;
  children: ReactNode;
};

export default function SectionCard({ title, children }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: ADD_PRODUCT_COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ADD_PRODUCT_COLORS.border,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: ADD_PRODUCT_COLORS.text,
    marginBottom: 14,
  },
});