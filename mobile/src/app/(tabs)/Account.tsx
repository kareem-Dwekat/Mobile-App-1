import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

import ProfileHeader from "../../components/AccountComponents/AccountHeader";
import ProfileImage from "../../components/AccountComponents/AccountImage";
import MenuItem from "../../components/AccountComponents/MenuItem";
import { logoutUser } from "@/services/auth.service";
import { useUserProfile } from "@/hooks/useUserProfile";

const PROFILE_MENU_ITEMS = [
  { title: "My Orders", icon: "receipt-outline" },
  { title: "Payment History", icon: "card-outline" },
  { title: "Wish List", icon: "heart-outline" },
  { title: "Shipping Address", icon: "location-outline" },
  { title: "Your Profile", icon: "person-outline" },
  { title: "Add Product", icon: "add-circle-outline" }, 
  { title: "Logout", icon: "log-out-outline" },
];

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { profile, updatePhoto } = useUserProfile();

  const handleImageChange = async (imageUri: string, base64?: string) => {
    try {
      await updatePhoto(imageUri, base64);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update image";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    try {
      setIsLoggingOut(true);
      await logoutUser();
      router.replace("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoggingOut(false);
    }
  };

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
        void handleLogout();
        break;

      default:
        Alert.alert(title);
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 96 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader onBackPress={() => router.back()} />

        <ProfileImage
          name={profile.fullName}
          imageUri={profile.photoURL}
          onImageChange={handleImageChange}
        />

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
      </ScrollView>
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
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  menu: {
    marginTop: 10,
    backgroundColor: "#fafafa",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e4dfdf",
  },
});
