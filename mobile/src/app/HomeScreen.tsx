import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SearchBar } from "../components/HomeScreen/SearchBar";
import { FilterCategory } from "../components/HomeScreen/FilterCategory";
import { CategoryScroll } from "../components/HomeScreen/CategoryScroll";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/HomeScreen/ProductCard";

const categories = [
  { id: "0", name: "All", icon: "apps" },
  { id: "1", name: "Men", icon: "man" },
  { id: "2", name: "Women", icon: "woman" },
  { id: "3", name: "Kids", icon: "happy" },
  { id: "4", name: "Shoes", icon: "walk" },
  { id: "5", name: "Electronics", icon: "phone-portrait" },
  { id: "6", name: "Bags", icon: "briefcase" },
  { id: "7", name: "Sports", icon: "football" },
  { id: "8", name: "Seasonal", icon: "sunny" },
  { id: "9", name: "Perfumes", icon: "flame" },
  { id: "10", name: "Accessories", icon: "sparkles" },
  { id: "11", name: "Watches", icon: "time" },
  { id: "12", name: "Glasses", icon: "eye" },
  { id: "13", name: "Furniture", icon: "bed" },
  { id: "14", name: "Cosmetics", icon: "color-palette" },
  { id: "15", name: "Mobiles", icon: "phone-portrait-outline" },
  { id: "16", name: "Laptops", icon: "laptop" },
  { id: "17", name: "Games", icon: "game-controller" },
  { id: "18", name: "Home Appliances", icon: "home" },
];

export default function HomeScreen() {
  const { data, isLoading } = useProducts();

  const [searchValue, setSearchValue] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const [page, setPage] = React.useState(1);
  const PAGE_SIZE = 50;

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleCategorySelect = (category: string) => {
    // 👇 بدل ما نفلتر هون، نروح على صفحة الكاتجري
    router.push({
      pathname: "/category/[name]",
      params: { name: category },
    });
  };

  const filteredProducts = data?.filter((item: any) => {
    return (
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const totalPages = Math.ceil((filteredProducts?.length || 0) / PAGE_SIZE);

  const paginatedProducts = filteredProducts?.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <FlatList
      data={paginatedProducts}
      keyExtractor={(item: any) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ProductCard item={item} />}
      contentContainerStyle={{ paddingBottom: 100 }}

      ListHeaderComponent={
        <>
          <View style={styles.searchRow}>
            <View style={{ flex: 1 }}>
              <SearchBar onSubmit={handleSearch} />
            </View>
            <FilterCategory
              categories={categories.map((c) => c.name)}
              onSelect={setSelectedCategory}
            />
          </View>

          <Text style={styles.sectionTitle}>Categories</Text>
          <CategoryScroll categories={categories} onSelect={handleCategorySelect} />

          <Text style={styles.sectionTitle}>Products</Text>

          {isLoading && <Text>Loading...</Text>}
        </>
      }

      ListFooterComponent={
        <>
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={() => setPage((p) => Math.max(p - 1, 1))}
              style={styles.pageBtn}
            >
              <Text style={styles.pageText}>⬅ Prev</Text>
            </TouchableOpacity>

            <Text style={styles.pageNumber}>
              {page} / {totalPages || 1}
            </Text>

            <TouchableOpacity
              onPress={() => setPage((p) => (p < totalPages ? p + 1 : p))}
              style={styles.pageBtn}
            >
              <Text style={styles.pageText}>Next ➡</Text>
            </TouchableOpacity>
          </View>

          {paginatedProducts?.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No products found
            </Text>
          )}
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },

  pageBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  pageText: {
    color: "#fff",
    fontWeight: "600",
  },

  pageNumber: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
