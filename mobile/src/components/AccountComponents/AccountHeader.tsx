import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProfileHeaderProps = {
  onBackPress?: () => void;
};

const ProfileHeader = ({ onBackPress }: ProfileHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={onBackPress}>
       
      </TouchableOpacity>

      <Text style={styles.title}>Account</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  backBtn: {
    padding: 6,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },
});