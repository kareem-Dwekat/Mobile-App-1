import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

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
import { useUserProfile } from "@/hooks/useUserProfile";

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, updateProfileData, updatePhoto } = useUserProfile();

  const [saving, setSaving] = useState(false);

  const { control, handleSubmit, reset, watch } = useForm<ProfileFormData>({
    defaultValues: {
      email: "",
      password: "************",
      zipCode: "5000",
      address: "Dhaka",
      city: "Melbourne",
      state: "Victoria (VIC)",
      country: "Australia",
      accountHolderName: "customers",
    },
  });

  const accountHolderName = watch("accountHolderName");

  useEffect(() => {
    reset({
      email: profile.email,
      password: "************",
      zipCode: profile.zipCode,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      country: profile.country,
      accountHolderName: profile.fullName,
    });
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (saving) return;

    try {
      setSaving(true);

      await updateProfileData({
        fullName: data.accountHolderName,
        email: data.email,
        photoURL: profile.photoURL,
        zipCode: data.zipCode,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
      });

      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      Alert.alert("Error", errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = async (imageUri: string, base64?: string) => {
    try {
      await updatePhoto(imageUri, base64);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update image";
      Alert.alert("Error", errorMessage);
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

        <ProfileImage
          name={accountHolderName || "User"}
          imageUri={profile.photoURL}
          onImageChange={handleImageChange}
        />

        <SectionTitle title="Personal Details" />

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          }}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <ProfileInput
              label="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value } }) => (
            <ProfileInput
              label="Password"
              value={value}
              onChangeText={() => {}}
              secureTextEntry
              editable={false}
            />
          )}
        />

        <View style={styles.divider} />

        <SectionTitle title="Business Address Details" />

        <Controller
          control={control}
          name="zipCode"
          rules={{
            required: "Zip code is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Zip code must be numbers only",
            },
          }}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <ProfileInput
              label="Zip Code"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="number-pad"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          rules={{ required: "Address is required" }}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <ProfileInput
              label="Address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="city"
          rules={{ required: "City is required" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ProfileSelect
              label="City"
              selectedValue={value}
              onValueChange={onChange}
              items={CITY_OPTIONS}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="state"
          rules={{ required: "State is required" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ProfileSelect
              label="State"
              selectedValue={value}
              onValueChange={onChange}
              items={STATE_OPTIONS}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="country"
          rules={{ required: "Country is required" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ProfileSelect
              label="Country"
              selectedValue={value}
              onValueChange={onChange}
              items={COUNTRY_OPTIONS}
              error={error?.message}
            />
          )}
        />

        <View style={styles.divider} />

        <Controller
          control={control}
          name="accountHolderName"
          rules={{ required: "Account holder name is required" }}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <ProfileInput
              label="Account Holder's Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error?.message}
            />
          )}
        />

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleSubmit(onSubmit)}
          disabled={saving}
        >
          <Text style={styles.confirmText}>
            {saving ? "Saving..." : "Confirm"}
          </Text>
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