import React from "react";
import { FlatList } from "react-native";
import { homeCategories } from "../../constants/home";
import CategoryItem from "./CategoryItem";

const CategoriesRow = () => {
  return (
    <FlatList
      horizontal
      data={homeCategories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CategoryItem item={item} />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 8 }}
    />
  );
};

export default CategoriesRow;