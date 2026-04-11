import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/auth/LoginForm";
import { AUTH_COLORS } from "../constants/auth";
import { LoginErrors } from "../types/auth";
import { validateLoginForm } from "../utils/authValidation";
import { loginUser } from "../services/auth.service";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleLogin = async () => {
    const validationErrors = validateLoginForm({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const result = await loginUser(email, password);

      Alert.alert("Welcome", result.userData?.fullName || "User");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
              email={email}
              password={password}
              errors={errors}
              loading={loading}
              onChangeEmail={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: "" }));
                }
              }}
              onChangePassword={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
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