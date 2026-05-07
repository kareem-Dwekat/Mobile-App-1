import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import CategoryItem from "./CategoryItem";
import { getCategories } from "@/services/categoryService";
import { CategoryItemType } from "@/types/category";

type Props = {
  onSelectCategory?: (category: string) => void;
};

const CategoriesRow = ({ onSelectCategory }: Props) => {
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
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 8 }}
      renderItem={({ item }) => (
        <CategoryItem
          item={item}
          onPress={() => onSelectCategory?.(item.title)}
        />
      )}
    />
  );
};

export default CategoriesRow;