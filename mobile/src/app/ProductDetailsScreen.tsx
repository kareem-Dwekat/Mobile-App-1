import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { useLocalSearchParams, router } from "expo-router";
import { db } from "@/config/firebaseConfig";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (!id) return;

        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({
            id: productSnap.id,
            ...productSnap.data(),
          });
        }
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff5a00" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const imageSource =
    product?.images?.[0] ||
    product?.image ||
    "https://via.placeholder.com/400x500.png?text=No+Image";

  const createdDate = product.createdAt?.toDate
    ? product.createdAt.toDate().toLocaleDateString()
    : "N/A";

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#111" />
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.iconCircle, liked && styles.likeActive]}
              onPress={() => setLiked(!liked)}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={25}
                color={liked ? "#fff" : "#ff3b30"}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="bag-outline" size={24} color="#111" />
            </TouchableOpacity>
          </View>
        </View>

        <Image source={{ uri: imageSource }} style={styles.productImage} />

        <View style={styles.indicator} />

        <View style={styles.content}>
          <Text style={styles.title}>{product.productName || "No Title"}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ${Number(product.price || 0).toFixed(2)}
            </Text>
          </View>

          <Text style={styles.description}>
            {product.description || "No description available."}
          </Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Brand</Text>
              <Text style={styles.infoValue}>{product.brand || "Unknown"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>
                {product.category || "Unknown"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Stock</Text>
              <Text style={styles.infoValue}>{product.stock || 0} Pieces</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Created</Text>
              <Text style={styles.infoValue}>{createdDate}</Text>
            </View>
          </View>

          <View style={styles.ratingQuantityRow}>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Ionicons
                  key={item}
                  name={item <= (product.rating || 4) ? "star" : "star-outline"}
                  size={16}
                  color="#ff9500"
                />
              ))}

              <Text style={styles.reviewText}>
                ({product.reviews || 1} Review)
              </Text>
            </View>

            <View style={styles.quantityBox}>
              <TouchableOpacity
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{quantity}</Text>

              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.buyBtn}>
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartBtn}>
          <Ionicons name="bag-outline" size={21} color="#fff" />
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerRight: {
    flexDirection: "row",
    gap: 12,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  likeActive: {
    backgroundColor: "#ff3b30",
  },

  productImage: {
    width: "100%",
    height: 530,
    resizeMode: "cover",
  },

  indicator: {
    width: 25,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#ff6a00",
    alignSelf: "center",
    marginTop: -22,
    marginBottom: 22,
  },

  content: {
    paddingHorizontal: 28,
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111",
  },

  description: {
    fontSize: 16,
    color: "#999",
    lineHeight: 24,
    marginBottom: 20,
  },

  infoContainer: {
    marginTop: 4,
    marginBottom: 22,
    backgroundColor: "#f8f8f8",
    borderRadius: 14,
    padding: 16,
    gap: 14,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  infoLabel: {
    fontSize: 15,
    color: "#777",
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 15,
    color: "#111",
    fontWeight: "700",
  },

  ratingQuantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  reviewText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginLeft: 5,
  },

  quantityBox: {
    width: 140,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  qtyBtn: {
    fontSize: 20,
    fontWeight: "700",
    color: "#777",
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  bottomBar: {
    position: "absolute",
    bottom: 18,
    left: 24,
    right: 24,
    flexDirection: "row",
    gap: 12,
  },

  buyBtn: {
    flex: 1,
    height: 58,
    backgroundColor: "#000",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  cartBtn: {
    flex: 1,
    height: 58,
    backgroundColor: "#ff5a00",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  cartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});