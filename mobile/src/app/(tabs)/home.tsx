import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import CategoriesRow from "../../components/HomeScreen/CategoriesRow";
import FilterModal from "../../components/HomeScreen/FilterModal";
import HomeHeader from "../../components/HomeScreen/HomeHeader";
import ProductCard from "../../components/HomeScreen/ProductCard";
import PromoBanner from "../../components/HomeScreen/PromoBanner";
import SearchSection from "../../components/HomeScreen/SearchSection";
import SectionHeader from "../../components/HomeScreen/SectionHeader";
import { featuredProducts, homeCategories } from "../../constants/home";
import { initialWishlistData } from "../../constants/wishlist";

const normalizeCategory = (category?: string) => {
  if (!category) {
    return "";
  }

  return category.trim() === "Home" ? "Home Items" : category.trim();
};

export default function Home() {
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [draftCategory, setDraftCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [draftMaxPrice, setDraftMaxPrice] = useState(5000);

  const wishlistCount = initialWishlistData.length;

  const filterCategories = useMemo(() => {
    const productCategories = featuredProducts
      .map((item) => normalizeCategory(item.category))
      .filter((category) => Boolean(category));

    const baseCategories = homeCategories.map((item) =>
      normalizeCategory(item.name)
    );

    return [
      "All",
      ...Array.from(new Set([...baseCategories, ...productCategories])),
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    return featuredProducts.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPrice = Number(item.price) <= maxPrice;

      const itemCategory = normalizeCategory(item.category);
      const matchesCategory =
        selectedCategory === "All" || itemCategory === selectedCategory;

      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [search, selectedCategory, maxPrice]);

  const openFilter = () => {
    setDraftCategory(selectedCategory);
    setDraftMaxPrice(maxPrice);
    setFilterVisible(true);
  };

  const handleClearFilters = () => {
    setDraftCategory("All");
    setDraftMaxPrice(5000);
  };

  const handleApplyFilters = () => {
    setSelectedCategory(draftCategory);
    setMaxPrice(draftMaxPrice);
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
                onFilterPress={openFilter}
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
          selectedCategory={draftCategory}
          maxPrice={draftMaxPrice}
          categories={filterCategories}
          onClose={() => setFilterVisible(false)}
          onSelectCategory={setDraftCategory}
          onChangePrice={setDraftMaxPrice}
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