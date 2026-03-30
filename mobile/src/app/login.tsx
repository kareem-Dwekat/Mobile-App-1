import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { loginUser } from "@/api/UsersService";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      console.log(res.data);

      router.replace("/"); // غيرها لاحقاً

    } catch (e) {
      console.log("Login error:", e);
    }
  };

  return (
    <View style={styles.container}>

      {/* Back */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

      <View style={styles.form}>

        {/*  LOGO */}
        <Image
          source={require("../assets/images/quickmart.png")} 
          style={styles.logo}
        />

        <Text style={styles.title}>Log In</Text>

        {/* Email */}
        <TextInput
          placeholder="customer@example.com"
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

        {/* Forgot */}
        <Text style={styles.forgot}>Forgot password</Text>

        {/* Button */}
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Not have an account yet? </Text>
          <Link href="/signup">
            <Text style={styles.link}>Sign Up</Text>
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
  },

  header: {
    position: "absolute",
    top: 60,
    left: 20,
  },

  logo: {
     width: width * 0.8,
  height: 150,
  resizeMode: "contain",
  alignSelf: "center",
  marginBottom: 25,
  
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },

  inputWithIcon: {
    flex: 1,
    padding: 16,
  },

  forgot: {
    color: "#888",
  marginBottom: 20,
  marginTop: 5,
  alignSelf: "flex-end",
  },

  button: {
    backgroundColor: "#ff6600",
  padding: 16,
  borderRadius: 12,
  alignItems: "center",
  width: "100%",
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
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
});