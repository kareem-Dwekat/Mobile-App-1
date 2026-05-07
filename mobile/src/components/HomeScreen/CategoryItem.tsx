import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CategoryItemType } from "../../types/category";

interface Props {
  item: CategoryItemType;
  onPress?: () => void;
  active?: boolean;
}

const CategoryItem = ({ item, onPress, active }: Props) => {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  const boxSize = isSmallDevice ? 52 : 58;
  const iconSize = isSmallDevice ? 22 : 24;
  const itemWidth = isSmallDevice ? 78 : 86;

  return (
    <TouchableOpacity
      style={[styles.container, { width: itemWidth }]}
      onPress={() => onPress?.()}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.iconBox,
          {
            width: boxSize,
            height: boxSize,
            borderRadius: 16,
            backgroundColor: active ? "#DBEAFE" : "#FFFFFF",
            borderColor: active ? "#2563EB" : "#E5E7EB",
          },
        ]}
      >
        <Ionicons
          name={item.icon as any}
          size={iconSize}
          color={active ? "#1D4ED8" : "#2563EB"}
        />
      </View>

      <Text
        style={[
          styles.label,
          {
            fontSize: isSmallDevice ? 12 : 13,
            color: active ? "#1D4ED8" : "#111827",
            fontWeight: active ? "700" : "500",
          },
        ]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 14,
  },

  iconBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  label: {
    textAlign: "center",
    lineHeight: 18,
  },
});