import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS } from "../constants/colors";
import { useActionSheet } from "@expo/react-native-action-sheet";

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
  const { showActionSheetWithOptions } = useActionSheet();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleMenu = () => {
    if (onMenuPress) {
      onMenuPress();
      return;
    }

    const options = ["Set Active", "Delete", "Cancel"];
    const cancelButtonIndex = 2;
    const destructiveButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            Alert.alert("Success", "Address set as active");
            break;
          case 1:
            Alert.alert(
              "Delete Address",
              "Are you sure you want to delete this address?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => Alert.alert("Deleted"),
                },
              ]
            );
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={handleMenu}>
        <Entypo name="plus" size={22} color={COLORS.text} />
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