import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoryItemType } from "../../types/home";

interface Props {
  item: CategoryItemType;
}

const CategoryItem = ({ item }: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name={item.icon as any} size={24} color="#222" />
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 72,
    marginRight: 14,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: "#222",
    textAlign: "center",
  },
});