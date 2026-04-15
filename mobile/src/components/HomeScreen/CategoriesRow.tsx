import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import CategoryItem from "./CategoryItem";
import { getCategories } from "@/services/categoryService";
import { CategoryItemType } from "@/types/category";

const CategoriesRow = () => {
  const [categories, setCategories] = useState<CategoryItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data as CategoryItemType[]);
    } catch (error) {
      console.log("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CategoryItem item={item} />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 8 }}
    />
  );
};

export default CategoriesRow;