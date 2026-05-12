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
import { Controller, useForm } from "react-hook-form";
import { AUTH_COLORS } from "../../constants/auth";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  loading: boolean;
  onSubmit: (data: LoginFormData) => void;
  onForgotPassword: () => void;
  onGoToSignup: () => void;
};

export default function LoginForm({
  loading,
  onSubmit,
  onForgotPassword,
  onGoToSignup,
}: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

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
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Enter your email"
            style={[styles.input, errors.email ? styles.inputError : null]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
        )}
      />
      {!!errors.email && (
        <Text style={styles.error}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={[styles.input, errors.password ? styles.inputError : null]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
      />
      {!!errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, loading ? styles.buttonDisabled : null]}
        onPress={handleSubmit(onSubmit)}
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