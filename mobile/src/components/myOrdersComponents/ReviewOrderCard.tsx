import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ReviewOrderItemType } from "../../types/reviewOrder";

interface Props {
  item: ReviewOrderItemType;
  onReviewPress?: () => void;
}

const ReviewOrderCard = ({ item, onReviewPress }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>

      <TouchableOpacity style={styles.reviewBtn} onPress={onReviewPress}>
        <Text style={styles.reviewText}>Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewOrderCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  reviewBtn: {
    backgroundColor: "#F97316",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  reviewText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});