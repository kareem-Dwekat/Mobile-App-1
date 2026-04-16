import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCart } from "../../hooks/CartContext";
import { useWishlist } from "../../hooks/useWishlist";
import { WishlistItemType } from "../../types/wishlist";

export default function Wishlist() {
  const { addToCart } = useCart();
  const {
    items,
    toggleSelect,
    changeQty,
    toggleSelectAll,
    handleDeleteSelected,
    handleAddToCart,
  } = useWishlist();

  const onAddToCart = () => {
    handleAddToCart(addToCart);
    router.push("/(tabs)/cart");
  };

  // @ts-ignore - Firebase sync in background

  const renderItem = ({ item }: { item: WishlistItemType }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleSelect(item.id)}>
        <View style={[styles.checkbox, item.selected && styles.checked]}>
          {item.selected && (
            <Ionicons name="checkmark" size={14} color="#fff" />
          )}
        </View>
      </TouchableOpacity>

      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>

      <View style={styles.qtyBox}>
        <TouchableOpacity onPress={() => changeQty(item.id, "dec")}>
          <Text style={styles.qtyBtn}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>{item.qty}</Text>

        <TouchableOpacity onPress={() => changeQty(item.id, "inc")}>
          <Text style={styles.qtyBtn}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const allSelected = items.length > 0 && items.every((item) => item.selected);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Wishlist</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottom}>
        <TouchableOpacity onPress={toggleSelectAll} style={styles.selectAll}>
          <View style={[styles.checkbox, allSelected && styles.checked]}>
            {allSelected && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </View>
          <Text style={styles.selectAllText}>Select all</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cartBtn} onPress={onAddToCart}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDeleteSelected}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111",
  },
  listContent: {
    paddingBottom: 140,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checked: {
    backgroundColor: "#FF6B00",
    borderColor: "#FF6B00",
  },
  image: {
    width: 78,
    height: 78,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#222",
  },
  category: {
    fontSize: 12,
    color: "#777",
    marginVertical: 4,
  },
  price: {
    fontWeight: "700",
    fontSize: 15,
    color: "#111",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 34,
  },
  qtyBtn: {
    fontSize: 18,
    paddingHorizontal: 6,
    color: "#111",
  },
  qtyText: {
    marginHorizontal: 8,
    color: "#111",
    fontWeight: "500",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  selectAll: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  selectAllText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  cartText: {
    color: "#111",
    fontWeight: "600",
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 8,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
  },
});
