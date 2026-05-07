import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../hooks/CartContext";
import { useWishlist } from "../hooks/useWishlist";
import { CartItemType } from "../types/cart";
import { WishlistItemType } from "../types/wishlist";

const { width } = Dimensions.get("window");

export default function ProductDetail() {
  const params = useLocalSearchParams();

  const { addToCart } = useCart();
  const { addToWishlist, items: wishlistItems } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  const productId = String(params.id ?? "");
  const productName = String(params.productName ?? "");
  const description = String(params.description ?? "");
  const category = String(params.category ?? "");
  const brand = String(params.brand ?? "");
  const price = Number(params.price ?? 0);
  const stock = Number(params.stock ?? 0);

  let images: string[] = [];

  try {
    images = params.images ? JSON.parse(String(params.images)) : [];
  } catch {
    images = [];
  }

  const mainImage =
    images[selectedImage] ||
    "https://via.placeholder.com/400x400.png?text=No+Image";

  const isInWishlist = wishlistItems.some((item) => item.id === productId);

  const handleAddToCart = () => {
    const cartItem: CartItemType = {
      id: productId,
      title: productName,
      category,
      price,
      image: images[0] ?? "",
      qty,
      selected: true,
      quantity: 0
    };

    addToCart([cartItem]);

    router.push("/(tabs)/cart");
  };

  const handleWishlist = () => {
    const wishlistItem: WishlistItemType = {
      id: productId,
      title: productName,
      category,
      price,
      image: images[0] ?? "",
      qty: 1,
      selected: false,
    };

    addToWishlist(wishlistItem);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {productName}
        </Text>

        <TouchableOpacity onPress={handleWishlist} style={styles.wishBtn}>
          <Ionicons
            name={isInWishlist ? "heart" : "heart-outline"}
            size={24}
            color={isInWishlist ? "#FF6B00" : "#111"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: mainImage }}
            style={styles.mainImage}
            resizeMode="cover"
          />

          {stock <= 5 && stock > 0 && (
            <View style={styles.stockBadge}>
              <Text style={styles.stockBadgeText}>Only {stock} left!</Text>
            </View>
          )}

          {stock === 0 && (
            <View style={[styles.stockBadge, styles.outOfStock]}>
              <Text style={styles.stockBadgeText}>Out of Stock</Text>
            </View>
          )}
        </View>

        {images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbRow}
          >
            {images.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(index)}
                style={[
                  styles.thumb,
                  selectedImage === index && styles.thumbActive,
                ]}
              >
                <Image
                  source={{ uri: img }}
                  style={styles.thumbImg}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.info}>
          <View style={styles.tagRow}>
            {category ? (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{category}</Text>
              </View>
            ) : null}

            {brand ? (
              <View style={[styles.tag, styles.tagBrand]}>
                <Text style={[styles.tagText, styles.tagBrandText]}>
                  {brand}
                </Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.productName}>{productName}</Text>

          <Text style={styles.price}>${price.toFixed(2)}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {description && description !== "undefined"
              ? description
              : "No description available."}
          </Text>

          <View style={styles.divider} />

          <View style={styles.stockRow}>
            <Ionicons
              name="cube-outline"
              size={18}
              color={stock > 0 ? "#22C55E" : "#EF4444"}
            />

            <Text
              style={[
                styles.stockText,
                { color: stock > 0 ? "#22C55E" : "#EF4444" },
              ]}
            >
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Quantity</Text>

          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty((q) => Math.max(1, q - 1))}
            >
              <Ionicons name="remove" size={20} color="#111" />
            </TouchableOpacity>

            <Text style={styles.qtyNum}>{qty}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              disabled={stock === 0}
              onPress={() => setQty((q) => Math.min(stock || 99, q + 1))}
            >
              <Ionicons name="add" size={20} color="#111" />
            </TouchableOpacity>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${(price * qty).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.wishlistBottomBtn}
          onPress={handleWishlist}
        >
          <Ionicons
            name={isInWishlist ? "heart" : "heart-outline"}
            size={22}
            color={isInWishlist ? "#FF6B00" : "#111"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.addToCartBtn, stock === 0 && styles.disabledBtn]}
          onPress={handleAddToCart}
          disabled={stock === 0}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  wishBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },

  scroll: { paddingBottom: 120 },

  imageWrapper: {
    width,
    height: width * 0.9,
    backgroundColor: "#F9FAFB",
  },
  mainImage: { width: "100%", height: "100%" },

  stockBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#F97316",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  outOfStock: { backgroundColor: "#EF4444" },
  stockBadgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  thumbRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  thumbActive: { borderColor: "#F97316" },
  thumbImg: { width: "100%", height: "100%" },

  info: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  tagRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagBrand: {
    backgroundColor: "#F3F4F6",
  },
  tagText: {
    fontSize: 12,
    color: "#F97316",
    fontWeight: "600",
  },
  tagBrandText: {
    color: "#6B7280",
  },

  productName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
    marginBottom: 8,
    lineHeight: 30,
  },
  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#F97316",
    marginBottom: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
  },

  stockRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stockText: {
    fontSize: 14,
    fontWeight: "600",
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyNum: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    minWidth: 30,
    textAlign: "center",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    padding: 14,
    borderRadius: 14,
  },
  totalLabel: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#F97316",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 28,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  wishlistBottomBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  addToCartBtn: {
    flex: 1,
    height: 52,
    backgroundColor: "#F97316",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  disabledBtn: {
    opacity: 0.4,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
