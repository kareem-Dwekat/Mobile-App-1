import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import CategoriesRow from "../../components/HomeScreen/CategoriesRow";
import FilterModal from "../../components/HomeScreen/FilterModal";
import HomeHeader from "../../components/HomeScreen/HomeHeader";
import ProductCard from "../../components/HomeScreen/ProductCard";
import PromoBanner from "../../components/HomeScreen/PromoBanner";
import SearchSection from "../../components/HomeScreen/SearchSection";
import SectionHeader from "../../components/HomeScreen/SectionHeader";

import { useWishlist } from "../../hooks/useWishlist";
import { getProductsFromFirestore } from "../../services/product.service";

type ProductItem = {
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  images: string[];
  createdAt?: any;
};

const normalizeCategory = (category?: string) => {
  if (!category) return "";
  return category.trim() === "Home" ? "Home Items" : category.trim();
};

export default function Home() {
  const insets = useSafeAreaInsets();
  const { items: wishlistItems } = useWishlist();

  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [draftCategory, setDraftCategory] = useState("All");

  const [maxPrice, setMaxPrice] = useState(5000);
  const [draftMaxPrice, setDraftMaxPrice] = useState(5000);

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 10;

  const wishlistCount = wishlistItems.reduce((total, item) => {
    return total + item.qty;
  }, 0);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProductsFromFirestore();
      setProducts(data as ProductItem[]);
    } catch (error) {
      console.log("Load products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setShowAll(false);
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.productName
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesPrice = Number(item.price) <= maxPrice;
      const itemCategory = normalizeCategory(item.category);

      const matchesCategory =
        selectedCategory === "All" || itemCategory === selectedCategory;

      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [products, search, selectedCategory, maxPrice]);

  const randomProducts = useMemo(() => {
    return [...filteredProducts].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [filteredProducts]);

  const displayedProducts = useMemo(() => {
    if (!showAll) return randomProducts;

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return filteredProducts.slice(start, end);
  }, [filteredProducts, showAll, currentPage, randomProducts]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

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
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <FlatList
            data={displayedProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            showsVerticalScrollIndicator={false}
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

                <CategoriesRow onSelectCategory={setSelectedCategory} />

                <PromoBanner />

                <SectionHeader
                  title="Products"
                  actionText="See all"
                  onPress={() => {
                    setShowAll(true);
                    setCurrentPage(1);
                  }}
                />
              </>
            }
            renderItem={({ item }) => <ProductCard item={item} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No products found</Text>
            }
          />
        )}

        {showAll && totalPages > 1 && (
          <View style={styles.pagination}>
            <Text
              style={styles.pageBtn}
              onPress={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </Text>

            <Text style={styles.pageText}>
              {currentPage} / {totalPages}
            </Text>

            <Text
              style={styles.pageBtn}
              onPress={() =>
                setCurrentPage((p) => (p < totalPages ? p + 1 : p))
              }
            >
              Next
            </Text>
          </View>
        )}

        <FilterModal
          visible={filterVisible}
          selectedCategory={draftCategory}
          maxPrice={draftMaxPrice}
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
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  loader: {
    marginTop: 40,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  pageBtn: {
    marginHorizontal: 20,
    color: "#2F80ED",
    fontSize: 16,
  },
  pageText: {
    fontSize: 16,
    fontWeight: "600",
  },
});