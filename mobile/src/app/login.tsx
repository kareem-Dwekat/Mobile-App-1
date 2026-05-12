import { router } from "expo-router";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";

import LoginForm from "../components/auth/LoginForm";
import { AUTH_COLORS } from "../constants/auth";
import { loginUser } from "../services/auth.service";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const loginMutation = useMutation({
    mutationFn: ({
      email,
      password,
    }: LoginFormData) => loginUser(email, password),

    onSuccess: (result) => {
      Alert.alert("Welcome", result.userData?.fullName || "User");

      router.replace("/(tabs)/home");
    },

    onError: (error: any) => {
      Alert.alert("Error", error?.message || "Login failed");
    },
  });

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <LoginForm
              loading={loginMutation.isPending}
              onSubmit={handleLogin}
              onForgotPassword={() => router.push("/forgot-password")}
              onGoToSignup={() => router.push("/signup")}
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