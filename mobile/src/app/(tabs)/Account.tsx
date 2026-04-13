import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import ProfileHeader from "../../components/AccountComponents/AccountHeader";
import ProfileImage from "../../components/AccountComponents/AccountImage";
import MenuItem from "../../components/AccountComponents/MenuItem";
import { logoutUser } from "@/services/auth.service";

const PROFILE_MENU_ITEMS = [
  { title: "My Orders", icon: "receipt-outline" },
  { title: "Payment History", icon: "card-outline" },
  { title: "Wish List", icon: "heart-outline" },
  { title: "Shipping Address", icon: "location-outline" },
  { title: "Your Profile", icon: "person-outline" },
  { title: "Add Product", icon: "add-circle-outline" }, // 👈 تمت الإضافة
  { title: "Logout", icon: "log-out-outline" },
];

const ProfileScreen = () => {
  const handleMenuPress = (title: string) => {
    switch (title) {
      case "My Orders":
        router.push("/myOrders");
        break;

      case "Wish List":
        router.push("/(tabs)/wishlist");
        break;

      case "Shipping Address":
        router.push("/ShippingAddressScreen");
        break;

      case "Payment History":
        router.push("/payment-history");
        break;

      case "Your Profile":
        router.push("/profile");
        break;

      case "Add Product":
        router.push("/add-product");
        break;

      case "Logout":
        Alert.alert(
          "Confirm Logout",
          "Are you sure you want to logout?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Yes, Logout",
              style: "destructive",
              onPress: async () => {
                try {
                  await logoutUser();
                  router.replace("/login");
                } catch (error) {
                  Alert.alert("Error", "Logout failed");
                }
              },
            },
          ],
          { cancelable: true }
        );
        break;

      default:
        Alert.alert(title);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ProfileHeader onBackPress={() => router.back()} />

        <ProfileImage onEditPress={() => Alert.alert("Edit Profile Image")} />

        <View style={styles.menu}>
          {PROFILE_MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              onPress={() => handleMenuPress(item.title)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menu: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#fafafa",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e4dfdf",
  },
});