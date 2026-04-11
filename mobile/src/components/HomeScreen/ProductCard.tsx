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
import { ProductItemType } from "../../types/home";

interface Props {
  item: ProductItemType;
  onPress?: () => void;
}

const ProductCard = ({ item, onPress }: Props) => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 16 * 2 - 12) / 2;
  const imageHeight = cardWidth * 1.05;
  const isSmallDevice = width < 375;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Image
        source={{ uri: item.image }}
        style={[styles.image, { height: imageHeight }]}
        resizeMode="cover"
      />

      <Text
        style={[styles.title, { fontSize: isSmallDevice ? 14 : 16 }]}
        numberOfLines={1}
      >
        {item.title}
      </Text>

      <View style={styles.priceRow}>
        <Text style={[styles.price, { fontSize: isSmallDevice ? 14 : 16 }]}>
          ${item.price}
        </Text>

        {item.oldPrice ? (
          <Text
            style={[styles.oldPrice, { fontSize: isSmallDevice ? 12 : 14 }]}
          >
            ${item.oldPrice}
          </Text>
        ) : null}
      </View>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color="#F6B100" />
        <Text style={[styles.rating, { fontSize: isSmallDevice ? 12 : 13 }]}>
          {item.rating} ({item.reviews})
        </Text>
      </View>

      {item.location ? (
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={13} color="#6B7280" />
          <Text style={styles.metaText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
      ) : null}

      {item.condition ? (
        <View style={styles.metaRow}>
          <Ionicons name="pricetag-outline" size={13} color="#6B7280" />
          <Text style={styles.metaText} numberOfLines={1}>
            {item.condition}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  image: {
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  price: {
    fontWeight: "700",
    color: "#111",
    marginRight: 8,
  },
  oldPrice: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  rating: {
    color: "#555",
    marginLeft: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
    flex: 1,
  },
});