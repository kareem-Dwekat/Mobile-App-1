import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ProfileImageProps = {
  name?: string;
};

const STORAGE_KEY = "profile_image_uri";

const ProfileImage = ({ name = "User" }: ProfileImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  useEffect(() => {
    const loadImage = async () => {
      const savedImage = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedImage) {
        setSelectedImage(savedImage);
      }
    };

    loadImage();
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission needed", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    const imageUri = result.assets[0].uri;

    setSelectedImage(imageUri);
    await AsyncStorage.setItem(STORAGE_KEY, imageUri);
  };

  return (
    <View style={styles.imageWrapper}>
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="person-outline" size={42} color="#9ca3af" />
          </View>
        )}

        <TouchableOpacity style={styles.editBtn} onPress={pickImage}>
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