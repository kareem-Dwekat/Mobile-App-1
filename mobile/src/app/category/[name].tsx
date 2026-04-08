import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ProductCard } from "../../components/HomeScreen/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import React from "react";

export default function CategoryPage() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { data, isLoading } = useProducts();

  const [sortBy, setSortBy] = React.useState<"price" | "rating" | "none">("none");
  const [page, setPage] = React.useState(1);
  const PAGE_SIZE = 20;

  // فلترة حسب الكاتجري
  let filtered = data?.filter((item: any) =>
    name === "All" ? true : item.category === name
  );

  // ترتيب حسب السعر أو التقييم
  if (sortBy === "price") {
    filtered = filtered?.sort((a: any, b: any) => a.price - b.price);
  } else if (sortBy === "rating") {
    filtered = filtered?.sort((a: any, b: any) => b.rating - a.rating);
  }

  // Pagination
  const totalPages = Math.ceil((filtered?.length || 0) / PAGE_SIZE);
  const paginatedProducts = filtered?.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <View style={styles.container}>
      {/* عنوان الكاتجري */}
      <Text style={styles.title}>{name} Products</Text>

      {/* أزرار الفلترة */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, sortBy === "price" && styles.activeBtn]}
          onPress={() => { setSortBy("price"); setPage(1); }}
        >
          <Text style={styles.filterText}>Sort by Price</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, sortBy === "rating" && styles.activeBtn]}
          onPress={() => { setSortBy("rating"); setPage(1); }}
        >
          <Text style={styles.filterText}>Sort by Rating</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, sortBy === "none" && styles.activeBtn]}
          onPress={() => { setSortBy("none"); setPage(1); }}
        >
          <Text style={styles.filterText}>Default</Text>
        </TouchableOpacity>
      </View>

      {isLoading && <Text>Loading...</Text>}

      {/* المنتجات */}
      <FlatList
        data={paginatedProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={
          <>
            {/* Pagination */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  filterBtn: {
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeBtn: {
    backgroundColor: "#4CAF50",
  },
  filterText: {
    fontWeight: "600",
    color: "#000",
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
