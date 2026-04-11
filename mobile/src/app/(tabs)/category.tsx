import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";

import CategoryHeader from "../../components/Category/CategoryHeader";
import CategoryAccordionItem from "../../components/Category/CategoryAccordionItem";
import BottomNavBar from "../../components/navigation/BottomNavBar";

import { categoryData } from "../../constants/category";

export default function CategoryScreen() {
  const [expandedId, setExpandedId] = React.useState<string>("2");

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryAccordionItem
            item={item}
            expanded={expandedId === item.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === item.id ? "" : item.id))
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<CategoryHeader />}
      />

  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});