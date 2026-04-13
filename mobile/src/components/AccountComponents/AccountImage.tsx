import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProfileImageProps = {
  imageUri?: string;
  onEditPress?: () => void;
};

const DEFAULT_IMAGE = "https://i.pravatar.cc/150?img=12";

const ProfileImage = ({
  imageUri = DEFAULT_IMAGE,
  onEditPress,
}: ProfileImageProps) => {
  return (
    <View style={styles.imageWrapper}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        <TouchableOpacity style={styles.editBtn} onPress={onEditPress}>
          <Ionicons name="pencil" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editBtn: {
    position: "absolute",
    right: 2,
    bottom: 2,
    backgroundColor: "#ff6b00",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});