import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { signupUser } from "@/api/UsersService";
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = async () => {
    try {
      if (password !== confirm) {
        console.log("Passwords do not match");
        return;
      }

      await signupUser({ name, email, password });

      router.replace("/login");

    } catch (e) {
      console.log("Signup error:", e);
    }
  };

  return (
    <View style={styles.container}>

      {/*  Back Arrow */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

      {/*  FORM  */}
      <View style={styles.form}>

        <Text style={styles.title}>Sign Up</Text>

        {/* Name */}
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* Email */}
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.inputWithIcon}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={22}
              color="#888"
            />
          </Pressable>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!showConfirm}
            style={styles.inputWithIcon}
            value={confirm}
            onChangeText={setConfirm}
          />
          <Pressable onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? "eye" : "eye-off"}
              size={22}
              color="#888"
            />
          </Pressable>
        </View>

        {/* Button */}
        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <Link href="/login">
            <Text style={styles.link}>Sign In</Text>
          </Link>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    padding: 20,
  },

  
  form: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    marginTop: -100,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },

  inputWithIcon: {
    flex: 1,
    padding: 14,
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  link: {
    color: "#ff6600",
    fontWeight: "bold",
  },

  header: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
});