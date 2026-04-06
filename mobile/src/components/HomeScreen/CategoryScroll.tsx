import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Category = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type Props = {
  categories: Category[];
  onSelect: (category: string) => void;
};

export const CategoryScroll: React.FC<Props> = ({ categories, onSelect }) => {
  const [selected, setSelected] = React.useState<string>("");

  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryCard,
            selected === item.name && styles.selectedCard,
          ]}
          onPress={() => {
            setSelected(item.name);
            onSelect(item.name);
          }}
        >
          <Ionicons
            name={item.icon}
            size={28}
            color={selected === item.name ? "#4CAF50" : "#555"}
          />
          <Text
            style={[
              styles.categoryText,
              selected === item.name && styles.selectedText,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 80,
    height: 90,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  selectedCard: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  selectedText: {
    color: "#4CAF50",
    fontWeight: "700",
  },
});
