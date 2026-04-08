import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logoBox}>
          <Text style={styles.logoMark}>⬡</Text>
        </View>
        <Text style={styles.title}>Elevate</Text>
      </View>

      <TouchableOpacity style={styles.iconBtn}>
        <Ionicons name="heart-outline" size={22} color="#111" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>2</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBox: {
    marginRight: 8,
  },
  logoMark: {
    fontSize: 22,
    color: "#5B6CFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  iconBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#fff",
  },
  badge: {
    position: "absolute",
    top: 3,
    right: 3,
    backgroundColor: "#FF4D4F",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});