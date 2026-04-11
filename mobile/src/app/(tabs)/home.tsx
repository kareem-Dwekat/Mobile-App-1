import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeScreen/HomeHeader";
import SearchSection from "../../components/HomeScreen/SearchSection";
import CategoriesRow from "../../components/HomeScreen/CategoriesRow";
import PromoBanner from "../../components/HomeScreen/PromoBanner";
import SectionHeader from "../../components/HomeScreen/SectionHeader";
import ProductCard from "../../components/HomeScreen/ProductCard";
import FilterModal from "../../components/HomeScreen/FilterModal";
import { featuredProducts } from "../../constants/home";
import { initialWishlistData } from "../../constants/wishlist";

const filterCategories = [
  "All",
  "Vehicles",
  "Phones",
  "Electronics",
  "Furniture",
  "Clothing",
  "Shoes",
  "Books",
  "Gaming",
  "Home Items",
  "Accessories",
  "Sports",
  "Beauty",
  "Baby Items",
  "Pet Supplies",
];

export default function Home() {
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);

  const wishlistCount = initialWishlistData.length;

  const filteredProducts = useMemo(() => {
    return featuredProducts.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPrice = Number(item.price) <= maxPrice;

      const itemCategory = (item as any).category || "All";
      const matchesCategory =
        selectedCategory === "All" || itemCategory === selectedCategory;

      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [search, selectedCategory, maxPrice]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setMaxPrice(5000);
  };

  const handleApplyFilters = () => {
    setFilterVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={[styles.container, { paddingTop: insets.top > 0 ? 8 : 16 }]}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ProductCard item={item} />}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              <HomeHeader wishlistCount={wishlistCount} />
              <SearchSection
                search={search}
                onChangeSearch={setSearch}
                onFilterPress={() => setFilterVisible(true)}
              />
              <SectionHeader title="Categories" />
              <CategoriesRow />
              <PromoBanner />
              <SectionHeader title="Featured Products" actionText="See all" />
            </>
          }
        />

        <FilterModal
          visible={filterVisible}
          selectedCategory={selectedCategory}
          maxPrice={maxPrice}
          categories={filterCategories}
          onClose={() => setFilterVisible(false)}
          onSelectCategory={setSelectedCategory}
          onChangePrice={setMaxPrice}
          onClear={handleClearFilters}
          onApply={handleApplyFilters}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  productRow: {
    justifyContent: "space-between",
  },
});