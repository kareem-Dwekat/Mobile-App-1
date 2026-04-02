import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;

    let newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!email.includes("@")) {
      newErrors.email = "Invalid email";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully");
      router.replace("/");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        alert("User not found");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else if (error.code === "auth/invalid-credential") {
        alert("Wrong email or password");
      } else {
        alert("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Login to continue</Text>

              <TextInput
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}

              <TextInput
                placeholder="Enter your password"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              {errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.signupLink}>
                  Don’t have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },

  title: {
    fontSize: RFValue(24),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: RFValue(14),
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },

  error: {
    color: "red",
    fontSize: RFValue(12),
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#ff6600",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: RFValue(16),
    fontWeight: "700",
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#888",
    fontSize: RFValue(13),
  },

  signupLink: {
    marginTop: 10,
    textAlign: "center",
    color: "#ff6600",
    fontSize: RFValue(13),
    fontWeight: "700",
  },
});