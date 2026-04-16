import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  item: {
    id: string;
    productName?: string;
    price?: number;
    category?: string;
    brand?: string;
    images?: string[];
  };
  onPress?: () => void;
}

const ProductCard = ({ item, onPress }: Props) => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 16 * 2 - 12) / 2;
  const imageHeight = cardWidth * 1.05;
  const isSmallDevice = width < 375;

  const title = item?.productName || "No Title";
  const price = item?.price ?? 0;
  const category = item?.category || "No Category";
  const brand = item?.brand || "";
  const imageSource =
    item?.images && item.images.length > 0
      ? item.images[0]
      : "https://via.placeholder.com/300x300.png?text=No+Image";

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View>
        <Image
          source={{ uri: imageSource }}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="cover"
        />

        <View style={styles.heart}>
          <Ionicons name="heart-outline" size={16} color="#fff" />
        </View>
      </View>

      <Text
        style={[styles.title, { fontSize: isSmallDevice ? 14 : 16 }]}
        numberOfLines={1}
      >
        {title}
      </Text>

      <Text style={styles.category} numberOfLines={1}>
        {category}
      </Text>

      {brand ? (
        <Text style={styles.brand} numberOfLines={1}>
          {brand}
        </Text>
      ) : null}

      <View style={styles.priceRow}>
        <Text style={[styles.price, { fontSize: isSmallDevice ? 14 : 16 }]}>
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: "100%",
  },
  heart: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },
  title: {
    fontWeight: "600",
    color: "#222",
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  category: {
    fontSize: 13,
    color: "#6B7280",
    paddingHorizontal: 8,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  brand: {
    fontSize: 12,
    color: "#9CA3AF",
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  price: {
    fontWeight: "700",
    color: "#111",
  },
});