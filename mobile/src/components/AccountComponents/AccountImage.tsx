import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProfileImageProps = {
  imageUri?: string;
  name?: string;
  onEditPress?: () => void;
};

const ProfileImage = ({
  imageUri,
  name = "User",
  onEditPress,
}: ProfileImageProps) => {
  return (
    <View style={styles.imageWrapper}>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="person-outline" size={42} color="#9ca3af" />
          </View>
        )}

        <TouchableOpacity style={styles.editBtn} onPress={onEditPress}>
          <Ionicons name="pencil" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{name}</Text>
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
  placeholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
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