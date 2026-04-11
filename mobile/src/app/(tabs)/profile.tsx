import React from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileHeader from "../../components/profileComponents/ProfileHeader";
import ProfileImage from "../../components/profileComponents/ProfileImage";
import MenuItem from "../../components/profileComponents/MenuItem";

const PROFILE_MENU_ITEMS = [
  { title: "My Orders", icon: "receipt-outline" },
  { title: "Payment History", icon: "card-outline" },
  { title: "Wish List", icon: "heart-outline" },
  { title: "Shipping Address", icon: "location-outline" },
  { title: "Your Profile", icon: "person-outline" },
  { title: "Logout", icon: "log-out-outline" },
];

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleMenuPress = (title: string) => {
    Alert.alert(title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader onBackPress={() => navigation.goBack()} />

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
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
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