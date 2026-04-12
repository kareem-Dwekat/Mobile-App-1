import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AUTH_COLORS } from "../../constants/auth";
import { LoginFormProps } from "../../types/auth";

export default function LoginForm({
  email,
  password,
  errors,
  loading,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onForgotPassword,
  onGoToSignup,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        placeholder="Enter your email"
        style={[styles.input, errors.email ? styles.inputError : null]}
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
      />
      {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <View
        style={[
          styles.passwordContainer,
          errors.password ? styles.inputError : null,
        ]}
      >
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
          value={password}
          onChangeText={onChangePassword}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TouchableOpacity
        style={[styles.button, loading ? styles.buttonDisabled : null]}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoToSignup}>
        <Text style={styles.signupLink}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AUTH_COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: AUTH_COLORS.border,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: AUTH_COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: AUTH_COLORS.subText,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: AUTH_COLORS.inputBg,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: AUTH_COLORS.border,
  },
  passwordContainer: {
    backgroundColor: AUTH_COLORS.inputBg,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: AUTH_COLORS.border,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
  },
  inputError: {
    borderColor: AUTH_COLORS.error,
  },
  error: {
    color: AUTH_COLORS.error,
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: AUTH_COLORS.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: AUTH_COLORS.muted,
    fontSize: 13,
  },
  signupLink: {
    marginTop: 10,
    textAlign: "center",
    color: AUTH_COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },
});