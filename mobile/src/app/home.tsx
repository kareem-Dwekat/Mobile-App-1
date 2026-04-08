import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";

import HomeHeader from "../components/HomeScreen/HomeHeader";
import SearchSection from "../components/HomeScreen/SearchSection";
import CategoriesRow from "../components/HomeScreen/CategoriesRow";
import PromoBanner from "../components/HomeScreen/PromoBanner";
import SectionHeader from "../components/HomeScreen/SectionHeader";
import ProductCard from "../components/HomeScreen/ProductCard";
import BottomNavBar from "../components/navigation/BottomNavBar";

import { featuredProducts } from "../constants/home";

export default function home() {
  return (
    <View style={styles.container}>
      <FlatList
        data={featuredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <HomeHeader />
            <SearchSection />
            <SectionHeader title="Categories" />
            <CategoriesRow />
            <PromoBanner />
            <SectionHeader title="Featured Products" actionText="See all" />
          </>
        }
      />

      <BottomNavBar
        activeTab="home"
        cartCount={3}
        onHomePress={() => router.push("/")}
        onCategoriesPress={() => router.push("/category")}
        onCartPress={() => router.push("/")}
        onAccountPress={() => router.push("/(tabs)/profile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  listContent: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  productRow: {
    justifyContent: "space-between",
  },
});