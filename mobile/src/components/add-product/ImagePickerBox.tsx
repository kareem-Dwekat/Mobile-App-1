import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ADD_PRODUCT_COLORS } from "../../constants/addProduct";

type Props = {
  images: string[];
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
};

export default function ImagePickerBox({
  images,
  onAddImage,
  onRemoveImage,
}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.uploadBox} onPress={onAddImage}>
        <Ionicons name="cloud-upload-outline" size={28} color={ADD_PRODUCT_COLORS.primary} />
        <Text style={styles.uploadTitle}>Upload Product Images</Text>
        <Text style={styles.uploadSubTitle}>Tap to add image</Text>
      </TouchableOpacity>

      {images.map((item, index) => (
        <View key={item} style={styles.imageRow}>
          <Text style={styles.imageText}>{item}</Text>
          <TouchableOpacity onPress={() => onRemoveImage(index)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: ADD_PRODUCT_COLORS.primary,
    backgroundColor: ADD_PRODUCT_COLORS.primaryLight,
    borderRadius: 14,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: ADD_PRODUCT_COLORS.text,
  },
  uploadSubTitle: {
    marginTop: 4,
    fontSize: 13,
    color: ADD_PRODUCT_COLORS.subText,
  },
  imageRow: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: ADD_PRODUCT_COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageText: {
    fontSize: 14,
    color: ADD_PRODUCT_COLORS.text,
  },
  removeText: {
    color: ADD_PRODUCT_COLORS.error,
    fontWeight: "600",
  },
});