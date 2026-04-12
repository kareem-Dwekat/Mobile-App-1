import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import ReviewForm from "../components/myOrdersComponents/ReviewForm";

export default function ReviewOrderScreen() {
  const params = useLocalSearchParams();

  const title = (params.title as string) || "Leather Jacket";
  const description =
    (params.description as string) ||
    "This flowing satin maxi dress radiates timeless elegance with its silky texture and subtle shimmer. Designed with a flattering waistline and open-back detail, it's ideal for evening events, date nights, or special celebrations.";
  const price = (params.price as string) || "499.98";
  const image =
    (params.image as string) ||
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop";

  const handleSubmit = (rating: number, reviewText: string) => {
    Alert.alert("Review Updated", `Rating: ${rating}\nReview: ${reviewText}`);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#111" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Product a Review</Text>
        </View>

        <ReviewForm
          title={title}
          description={description}
          price={price}
          image={image}
          onCancel={() => router.back()}
          onSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
});