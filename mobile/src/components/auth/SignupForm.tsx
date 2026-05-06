import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { AUTH_COLORS } from "../../constants/auth";
import { SignupFormProps } from "../../types/auth";

export default function SignupForm({
  fullName,
  email,
  password,
  confirmPassword,
  errors,
  loading,
  onChangeFullName,
  onChangeEmail,
  onChangePassword,
  onChangeConfirmPassword,
  onSubmit,
  onGoToLogin,
}: SignupFormProps) {
  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        placeholder="Enter your full name"
        style={[styles.input, errors.fullName ? styles.inputError : null]}
        value={fullName}
        onChangeText={onChangeFullName}
        returnKeyType="next"
      />
      {!!errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

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

      <TextInput
        placeholder="Create password"
        secureTextEntry
        style={[styles.input, errors.password ? styles.inputError : null]}
        value={password}
        onChangeText={onChangePassword}
        returnKeyType="next"
      />
      {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        placeholder="Re-enter password"
        secureTextEntry
        style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
        value={confirmPassword}
        onChangeText={onChangeConfirmPassword}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
      />
      {!!errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, loading ? styles.buttonDisabled : null]}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoToLogin}>
        <Text style={styles.loginLink}>Already have an account? Sign In</Text>
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
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 15,
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
  loginLink: {
    marginTop: 15,
    textAlign: "center",
    color: AUTH_COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },
});