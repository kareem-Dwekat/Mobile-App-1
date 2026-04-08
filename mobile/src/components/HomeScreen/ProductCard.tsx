import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const ProductCard = ({ item }: any) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.category}>{item.category}</Text>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  category: {
    fontSize: 11,
    color: "#888",
    marginTop: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  price: {
    fontSize: 13,
    color: "#4CAF50",
    marginTop: 4,
  },
});