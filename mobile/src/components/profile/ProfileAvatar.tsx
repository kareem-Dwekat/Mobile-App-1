import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ACCOUNT_IMAGE, COLORS } from "@/constants/Profile";

export default function ProfileAvatar() {
  return (
    <View style={styles.container}>
      <Image source={ACCOUNT_IMAGE} style={styles.image} />
      <TouchableOpacity style={styles.editButton}>
        <Feather name="edit-2" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginBottom: 28,
    position: "relative",
  },
  image: {
    width: 132,
    height: 132,
    borderRadius: 66,
  },
  editButton: {
    position: "absolute",
    right: 2,
    bottom: 6,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
});