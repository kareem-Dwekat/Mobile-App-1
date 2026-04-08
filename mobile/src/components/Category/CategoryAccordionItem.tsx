import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoryItemType } from "../../types/category";
import CategorySubItem from "./CategorySubItem";

interface Props {
  item: CategoryItemType;
  expanded: boolean;
  onToggle: () => void;
}

const CategoryAccordionItem = ({ item, expanded, onToggle }: Props) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.row} onPress={onToggle} activeOpacity={0.8}>
        <View style={styles.left}>
          <Ionicons name={item.icon as any} size={24} color="#222222" />
          <Text style={styles.title}>{item.title}</Text>
        </View>

        <Ionicons
          name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
          size={22}
          color={expanded ? "#7C3AED" : "#222222"}
        />
      </TouchableOpacity>

      {expanded && hasChildren ? (
        <View style={styles.childrenBox}>
          {item.children?.map((child) => (
            <CategorySubItem key={child.id} title={child.title} />
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default CategoryAccordionItem;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    paddingVertical: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 16,
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
  },
  childrenBox: {
    paddingTop: 18,
  },
});