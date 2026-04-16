import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot, usePathname, router } from "expo-router";
import BottomNavBar from "../../components/navigation/BottomNavBar";

export default function TabsLayout() {
  const pathname = usePathname();

  const getActiveTab = () => {
    const normalizedPath = pathname.toLowerCase();

    if (
      normalizedPath.includes("account") ||
      normalizedPath.includes("profile")
    ) {
      return "account";
    }
    if (normalizedPath.includes("category")) return "categories";
    if (normalizedPath.includes("cart")) return "cart";
    return "home";
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>
      <BottomNavBar
  activeTab={getActiveTab()}
  cartCount={3}
  onHomePress={() => router.push("/(tabs)/home")}
  onCategoriesPress={() => router.push("/category")}
  onCartPress={() => router.push("/(tabs)/cart")}
  onAccountPress={() => router.push("/(tabs)/Account")}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
