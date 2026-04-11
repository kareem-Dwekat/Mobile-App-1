import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  title: string;
  actionText?: string;
}

const SectionHeader = ({ title, actionText }: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {actionText ? (
        <TouchableOpacity>
          <Text style={styles.action}>{actionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  action: {
    fontSize: 16,
    color: "#F97316",
    fontWeight: "600",
  },
});