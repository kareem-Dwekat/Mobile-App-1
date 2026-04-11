import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
}

const CategorySubItem = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="radio-button-off-outline" size={20} color="#6B7280" />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default CategorySubItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 54,
    paddingBottom: 14,
  },
  text: {
    marginLeft: 14,
    fontSize: 16,
    color: "#222222",
  },
});