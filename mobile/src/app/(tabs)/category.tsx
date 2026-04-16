import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const categoriesData = [
  { id: "1", title: "Electronics", icon: "phone-portrait-outline" },
  { id: "2", title: "Fashion", icon: "shirt-outline" },
  { id: "3", title: "Home", icon: "home-outline" },
  { id: "4", title: "Beauty", icon: "sparkles-outline" },
  { id: "5", title: "Sports", icon: "barbell-outline" },
  { id: "6", title: "Books", icon: "book-outline" },
  { id: "7", title: "Toys", icon: "game-controller-outline" },
  { id: "8", title: "Groceries", icon: "basket-outline" },
];

export default function CategoriesScreen() {
  const handlePressCategory = (category: string) => {
    router.push({
      pathname: "/(tabs)/home",
      params: { category },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Browse products by category</Text>

        <FlatList
          data={categoriesData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => handlePressCategory(item.title)}
            >
              <View style={styles.iconBox}>
                <Ionicons name={item.icon as any} size={30} color="#FF6A00" />
              </View>

              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>View items</Text>
            </TouchableOpacity>
          )}
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 22,
  },
  listContent: {
    paddingBottom: 30,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 14,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECECEC",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: "#FFF1E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
    textAlign: "center",
  },
  cardSub: {
    fontSize: 13,
    color: "#6B7280",
  },
});