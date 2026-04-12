import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  description: string;
  price: string;
  image: string;
  onCancel: () => void;
  onSubmit: (rating: number, reviewText: string) => void;
}

const ReviewForm = ({
  title,
  description,
  price,
  image,
  onCancel,
  onSubmit,
}: Props) => {
  const [rating, setRating] = useState(4);
  const [reviewText, setReviewText] = useState(
    "Gorgeous piece! The color is beautiful, and the stitching is really well done. It feels stylish yet practical for everyday wear. I was pleasantly surprised by how flattering it looks. Highly recommend!"
  );

  return (
    <View style={styles.container}>
      <View style={styles.productRow}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.productInfo}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>$ {price}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Select Product Rating</Text>

      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={40}
              color={star <= rating ? "#F59E0B" : "#D1D5DB"}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      <Text style={styles.reviewLabel}>Add detailed review</Text>

      <TextInput
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        textAlignVertical="top"
        style={styles.textArea}
        placeholder="Write your review here..."
        placeholderTextColor="#9CA3AF"
      />

      <Text style={styles.reviewLabel}>Attached Photos</Text>

      <View style={styles.photoBox}>
        <Ionicons name="images-outline" size={40} color="#60A5FA" />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => onSubmit(rating, reviewText)}
        >
          <Text style={styles.submitText}>Update Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 14,
    marginRight: 14,
    backgroundColor: "#E5E7EB",
  },
  productInfo: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 28,
    color: "#6B7280",
    marginBottom: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#4B5563",
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  star: {
    marginHorizontal: 6,
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  textArea: {
    minHeight: 150,
    borderWidth: 1.5,
    borderColor: "#9CA3AF",
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#fff",
    marginBottom: 22,
  },
  photoBox: {
    width: 110,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 10,
  },
  cancelBtn: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  cancelText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  submitBtn: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F97316",
  },
  submitText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});