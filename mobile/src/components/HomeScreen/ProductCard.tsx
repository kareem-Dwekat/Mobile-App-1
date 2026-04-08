import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProductItemType } from "../../types/home";

interface Props {
  item: ProductItemType;
}

const ProductCard = ({ item }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        {item.oldPrice ? (
          <Text style={styles.oldPrice}>${item.oldPrice}</Text>
        ) : null}
      </View>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color="#F6B100" />
        <Text style={styles.rating}>
          {item.rating} ({item.reviews})
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 18,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    marginBottom: 10,
  },
  rating: {
    fontSize: 13,
    color: "#555",
    marginLeft: 4,
  },
});
