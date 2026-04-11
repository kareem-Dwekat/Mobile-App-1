import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = () => {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logoBox}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={[
              styles.logo,
              {
                width: isSmallDevice ? 42 : 50,
                height: isSmallDevice ? 42 : 50,
              },
            ]}
          />
        </View>

        <Text
          style={[
            styles.title,
            {
              fontSize: isSmallDevice ? 20 : 22,
            },
          ]}
          numberOfLines={1}
        >
          QuickMart
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.iconBtn,
          {
            width: isSmallDevice ? 42 : 46,
            height: isSmallDevice ? 42 : 46,
            borderRadius: isSmallDevice ? 21 : 23,
          },
        ]}
      >
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
    flex: 1,
    paddingRight: 10,
  },
  logoBox: {
    marginRight: 8,
  },
  logo: {
    resizeMode: "contain",
  },
  title: {
    fontWeight: "700",
    color: "#111",
    flexShrink: 1,
  },
  iconBtn: {
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
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});