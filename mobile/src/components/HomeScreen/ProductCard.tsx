import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { useWishlist } from "../../hooks/useWishlist";
import type { WishlistItemType } from "../../types/wishlist";

type ProductItemType = {
  id: string;
  productName?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  brand?: string;
  images?: string[];
};

type Props = {
  item: ProductItemType;
};

const ProductCard = ({ item }: Props) => {
  const { width } = useWindowDimensions();
  const { items: wishlistItems, addToWishlist, removeFromWishlist } =
    useWishlist();

  const cardWidth = (width - 16 * 2 - 12) / 2;
  const imageHeight = cardWidth * 1.05;
  const isSmallDevice = width < 375;

  const title = item.productName ?? "No Title";
  const price = item.price ?? 0;
  const category = item.category ?? "No Category";
  const brand = item.brand ?? "";
  const imageSource =
    item.images && item.images.length > 0
      ? item.images[0]
      : "https://via.placeholder.com/300x300.png?text=No+Image";

  const isInWishlist = wishlistItems.some((wishItem) => wishItem.id === item.id);

  const handlePress = () => {
    router.push({
      pathname: "../product-detail",
      params: {
        id: item.id,
        productName: item.productName ?? "",
        description: item.description ?? "",
        price: String(item.price ?? 0),
        stock: String(item.stock ?? 0),
        category: item.category ?? "",
        brand: item.brand ?? "",
        images: JSON.stringify(item.images ?? []),
      },
    });
  };

  const handleWishlistPress = () => {
    if (isInWishlist) {
      removeFromWishlist(item.id);
      return;
    }

    const wishlistItem: WishlistItemType = {
      id: item.id,
      title,
      category,
      price,
      image: imageSource,
      qty: 1,
      selected: false,
    };

    addToWishlist(wishlistItem);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <View>
        <Image
          source={{ uri: imageSource }}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="cover"
        />

        <TouchableOpacity style={styles.heart} onPress={handleWishlistPress}>
          <Ionicons
            name={isInWishlist ? "heart" : "heart-outline"}
            size={16}
            color={isInWishlist ? "#FF6B00" : "#fff"}
          />
        </TouchableOpacity>
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