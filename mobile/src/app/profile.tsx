import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import SectionTitle from "@/components/profile/SectionTitle";
import ProfileInput from "@/components/profile/ProfileInput";
import ProfileSelect from "@/components/profile/ProfileSelect";
import ProfileImage from "@/components/AccountComponents/AccountImage";

import {
  COLORS,
  COUNTRY_OPTIONS,
  STATE_OPTIONS,
  CITY_OPTIONS,
} from "@/constants/Profile";

import { ProfileFormData } from "@/types/profile";
import { auth } from "@/config/firebaseConfig";

export default function ProfileScreen() {
  const router = useRouter();

  const [form, setForm] = useState<ProfileFormData>({
    email: "",
    password: "************",
    zipCode: "5000",
    address: "Dhaka",
    city: "Melbourne",
    state: "Victoria (VIC)",
    country: "Australia",
    accountHolderName: "customers",
  });

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setForm((prev) => ({
        ...prev,
        email: user.email ?? "",
        accountHolderName: user.displayName ?? prev.accountHolderName,
      }));
    }
  }, []);

  const handleChange = (key: keyof ProfileFormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleConfirm = () => {
    console.log("Saved Data:", form);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <ProfileImage name={form.accountHolderName} />

        <SectionTitle title="Personal Details" />

        <ProfileInput
          label="Email"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={false}
        />

        <ProfileInput
          label="Password"
          value={form.password}
          onChangeText={() => {}}
          secureTextEntry
          editable={false}
        />

        <View style={styles.divider} />

        <SectionTitle title="Business Address Details" />

        <ProfileInput
          label="Zip Code"
          value={form.zipCode}
          onChangeText={(text) => handleChange("zipCode", text)}
          keyboardType="number-pad"
        />

        <ProfileInput
          label="Address"
          value={form.address}
          onChangeText={(text) => handleChange("address", text)}
        />

        <ProfileSelect
          label="City"
          selectedValue={form.city}
          onValueChange={(value) => handleChange("city", value)}
          items={CITY_OPTIONS}
        />

        <ProfileSelect
          label="State"
          selectedValue={form.state}
          onValueChange={(value) => handleChange("state", value)}
          items={STATE_OPTIONS}
        />

        <ProfileSelect
          label="Country"
          selectedValue={form.country}
          onValueChange={(value) => handleChange("country", value)}
          items={COUNTRY_OPTIONS}
        />

        <View style={styles.divider} />

        <ProfileInput
          label="Account Holder's Name"
          value={form.accountHolderName}
          onChangeText={(text) => handleChange("accountHolderName", text)}
        />

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.screen,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.screen,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 18,
  },
  confirmButton: {
    marginTop: 14,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});