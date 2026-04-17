import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfileInput from "../components/profile/ProfileInput";
import ProfileSelect from "../components/profile/ProfileSelect";
import SectionTitle from "../components/profile/SectionTitle";

import {
  CITY_OPTIONS,
  COLORS,
  COUNTRY_OPTIONS,
  STATE_OPTIONS,
} from "../constants/Profile";
import { resetPassword } from "../services/auth.service";
import {
  getCurrentUserProfile,
  saveCurrentUserProfile,
} from "../services/profile.service";
import { ProfileFormData } from "../types/profile";

const INITIAL_FORM: ProfileFormData = {
  email: "",
  password: "",
  zipCode: "",
  address: "",
  city: CITY_OPTIONS[0]?.value || "",
  state: STATE_OPTIONS[0]?.value || "",
  country: COUNTRY_OPTIONS[0]?.value || "",
  accountHolderName: "",
};

export default function ProfileScreen() {
  const router = useRouter();

  const [form, setForm] = useState<ProfileFormData>(INITIAL_FORM);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const profileData = await getCurrentUserProfile();

        if (!isMounted) {
          return;
        }

        setForm((prev) => ({
          ...prev,
          ...profileData,
          city: profileData.city || prev.city,
          state: profileData.state || prev.state,
          country: profileData.country || prev.country,
          password: "",
        }));
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to load profile data";

        if (isMounted) {
          Alert.alert("Error", errorMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (key: keyof ProfileFormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleConfirm = async () => {
    if (isSaving || isLoadingProfile) {
      return;
    }

    try {
      setIsSaving(true);
      await saveCurrentUserProfile(form);
      setForm((prev) => ({ ...prev, password: "" }));
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save profile";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (isSendingReset) {
      return;
    }

    if (!form.email.trim()) {
      Alert.alert("Missing email", "No email found for this account.");
      return;
    }

    try {
      setIsSendingReset(true);
      await resetPassword(form.email);
      Alert.alert(
        "Check your email",
        "Password reset instructions were sent to your email address."
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send reset email";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSendingReset(false);
    }
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

        {isLoadingProfile ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading profile data...</Text>
          </View>
        ) : (
          <>
            <ProfileAvatar />

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
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry
              placeholder="Leave empty to keep your current password"
            />

            <TouchableOpacity
              style={styles.changePasswordBtn}
              onPress={handleChangePassword}
              disabled={isSendingReset}
            >
              <Text style={styles.changePasswordText}>
                {isSendingReset ? "Sending..." : "Change Password"}
              </Text>
            </TouchableOpacity>

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

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
              disabled={isSaving}
            >
              <Text style={styles.confirmText}>
                {isSaving ? "Saving..." : "Confirm"}
              </Text>
            </TouchableOpacity>
          </>
        )}
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
  changePasswordBtn: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 10,
  },
  changePasswordText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
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
  loadingContainer: {
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    color: COLORS.subText,
    fontSize: 15,
    fontWeight: "500",
  },
});