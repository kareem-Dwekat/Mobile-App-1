import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomNavBarProps } from "../../types/navigation";
import { useCart } from "../../hooks/CartContext";

const BottomNavBar = ({
  activeTab = "home",
  onHomePress,
  onCategoriesPress,
  onCartPress,
  onAccountPress,
}: BottomNavBarProps) => {
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.tab} onPress={onHomePress}>
        <Ionicons
          name="home-outline"
          size={24}
          color={activeTab === "home" ? "#F97316" : "#7B8794"}
        />
        <Text style={[styles.label, activeTab === "home" && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={onCategoriesPress}>
        <Ionicons
          name="grid-outline"
          size={24}
          color={activeTab === "categories" ? "#F97316" : "#7B8794"}
        />
        <Text style={[styles.label, activeTab === "categories" && styles.activeLabel]}>
          Categories
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={onCartPress}>
        <View style={styles.iconBox}>
          <Ionicons
            name="bag-handle-outline"
            size={24}
            color={activeTab === "cart" ? "#F97316" : "#7B8794"}
          />

          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>

        <Text style={[styles.label, activeTab === "cart" && styles.activeLabel]}>
          Cart
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={onAccountPress}>
        <Ionicons
          name="person-outline"
          size={24}
          color={activeTab === "account" ? "#F97316" : "#7B8794"}
        />
        <Text style={[styles.label, activeTab === "account" && styles.activeLabel]}>
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    position: "relative",
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: "#7B8794",
    fontWeight: "500",
  },
  activeLabel: {
    color: "#F97316",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
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