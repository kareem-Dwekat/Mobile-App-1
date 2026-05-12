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

import { useMutation } from "@tanstack/react-query";

import SignupForm from "../components/auth/SignupForm";

import { AUTH_COLORS } from "../constants/auth";

import { SignupErrors } from "../types/auth";

import { validateSignupForm } from "../utils/authValidation";

import { signupUser } from "../services/auth.service";

export default function SignupScreen() {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [errors, setErrors] =
    useState<SignupErrors>({});

  const signupMutation =
    useMutation({
      mutationFn: async () => {
        const validationErrors =
          validateSignupForm({
            fullName,
            email,
            password,
            confirmPassword,
          });

        setErrors(
          validationErrors
        );

        if (
          Object.keys(
            validationErrors
          ).length > 0
        ) {
          throw new Error(
            "Validation failed"
          );
        }

        return signupUser(
          fullName,
          email,
          password
        );
      },

      onSuccess: () => {
        Alert.alert(
          "Success",
          "Account created successfully"
        );

        router.replace(
          "/login"
        );
      },

      onError: (error: any) => {
        if (
          error?.message ===
          "Validation failed"
        ) {
          return;
        }

        console.log(
          "ERROR:",
          error
        );

        Alert.alert(
          "Error",
          error?.message ||
            "Signup failed"
        );
      },
    });

  const handleSignup = () => {
    signupMutation.mutate();
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.scrollContent
          }
        >
          <View
            style={
              styles.container
            }
          >
            <SignupForm
              fullName={fullName}
              email={email}
              password={password}
              confirmPassword={
                confirmPassword
              }
              errors={errors}
              loading={
                signupMutation.isPending
              }
              onChangeFullName={(
                text
              ) => {
                setFullName(text);

                if (
                  errors.fullName
                ) {
                  setErrors(
                    (
                      prev
                    ) => ({
                      ...prev,
                      fullName:
                        "",
                    })
                  );
                }
              }}
              onChangeEmail={(
                text
              ) => {
                setEmail(text);

                if (
                  errors.email
                ) {
                  setErrors(
                    (
                      prev
                    ) => ({
                      ...prev,
                      email:
                        "",
                    })
                  );
                }
              }}
              onChangePassword={(
                text
              ) => {
                setPassword(
                  text
                );

                if (
                  errors.password
                ) {
                  setErrors(
                    (
                      prev
                    ) => ({
                      ...prev,
                      password:
                        "",
                    })
                  );
                }
              }}
              onChangeConfirmPassword={(
                text
              ) => {
                setConfirmPassword(
                  text
                );

                if (
                  errors.confirmPassword
                ) {
                  setErrors(
                    (
                      prev
                    ) => ({
                      ...prev,
                      confirmPassword:
                        "",
                    })
                  );
                }
              }}
              onSubmit={
                handleSignup
              }
              onGoToLogin={() =>
                router.push(
                  "/login"
                )
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor:
        AUTH_COLORS.background,
    },

    flex: {
      flex: 1,
    },

    scrollContent: {
      flexGrow: 1,
    },

    container: {
      flex: 1,
      backgroundColor:
        AUTH_COLORS.background,
      justifyContent:
        "center",
      paddingHorizontal: 20,
    },
  });