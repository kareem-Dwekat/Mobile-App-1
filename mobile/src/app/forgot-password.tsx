import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import { AUTH_COLORS } from "../constants/auth";
import { resetPassword } from "../services/auth.service";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPasswordScreen() {
  const resetMutation = useMutation({
    mutationFn: (email: string) => resetPassword(email),

    onSuccess: () => {
      Alert.alert(
        "Success",
        "Password reset email sent. Please check your email."
      );

      router.replace("/login");
    },

    onError: (err: any) => {
      if (err.code === "auth/user-not-found") {
        Alert.alert("Error", "User not found");
      } else if (err.code === "auth/invalid-email") {
        Alert.alert("Error", "Invalid email address");
      } else if (err.code === "auth/too-many-requests") {
        Alert.alert("Error", "Too many attempts, try again later");
      } else {
        Alert.alert("Error", err?.message || "Something went wrong");
      }
    },
  });

  const handleReset = (data: ForgotPasswordFormData) => {
    resetMutation.mutate(data.email);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <ForgotPasswordForm
              loading={resetMutation.isPending}
              onSubmit={handleReset}
              onBackToLogin={() => router.push("/login")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AUTH_COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: AUTH_COLORS.background,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});