import React from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/Profile";

interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 18,
  },
});