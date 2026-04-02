import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS } from "../constants/colors";

type AddressHeaderProps = {
  title: string;
  onBack?: () => void;
  onMenuPress?: () => void;
};

export default function AddressHeader({
  title,
  onBack,
  onMenuPress,
}: AddressHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onMenuPress}>
        <Entypo name="dots-three-vertical" size={18} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 12,
    color: COLORS.text,
  },
});