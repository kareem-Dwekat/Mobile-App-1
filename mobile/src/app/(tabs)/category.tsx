import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { getProductsFromFirestore } from "@/services/product.service";
import ProductCard from "@/components/HomeScreen/ProductCard";

type ProductItem = {
  id: string;
  productName: string;
  price: number;
  category: string;
  images?: string[];
};

export default function CategoriesScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = width >= 768 ? "30%" : "47%";

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getProductsFromFirestore();
      setProducts(data as ProductItem[]);
    } finally {
      setLoading(false);
    }
  };

  const normalize = (t?: string) =>
    (t ?? "").toLowerCase().trim();

  const categories = useMemo(() => {
    const map: Record<string, ProductItem[]> = {};

    products.forEach((p) => {
      const key = normalize(p.category);
      if (!map[key]) map[key] = [];
      map[key].push(p);
    });

    return Object.keys(map).map((key) => {
      const items = map[key];
      const prices = items.map((i) => i.price);

      return {
        title: items[0]?.category || key,
        count: items.length,
        min: Math.min(...prices),
        max: Math.max(...prices),
      };
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return [];

    return products.filter(
      (p) =>
        normalize(p.category) === normalize(selectedCategory)
    );
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF6A00" />
      </View>
    );
  }

  if (!selectedCategory) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          <Text style={styles.title}>Categories</Text>
          <Text style={styles.subtitle}>
            Tap a category to view products
          </Text>

          <FlatList
            data={categories}
            numColumns={2}
            columnWrapperStyle={styles.row}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.card, { width: cardWidth }]}
                activeOpacity={0.85}
                onPress={() => setSelectedCategory(item.title)}
              >
                <View style={styles.iconBox}>
                  <Ionicons
                    name="pricetag-outline"
                    size={26}
                    color="#FF6A00"
                  />
                </View>

                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <Text style={styles.cardSub}>
                  {item.count} products
                </Text>

                <Text style={styles.price}>
                  ${item.min} - ${item.max}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* BACK HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {selectedCategory}
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* PRODUCTS */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() =>
                router.push({
                  pathname: "/ProductDetailsScreen",
                  params: { id: item.id },
                })
              }
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No products found
            </Text>
          }
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
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  productRow: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    elevation: 3,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#FFF1E8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  cardSub: {
    fontSize: 12,
    color: "#666",
  },

  price: {
    fontSize: 12,
    color: "#FF6A00",
    marginTop: 5,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});