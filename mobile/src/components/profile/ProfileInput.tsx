import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { COLORS } from "@/constants/Profile";

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function ProfileInput({ label, error, style, ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor="#9CA3AF"
        {...props}
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    marginTop: 6,
    color: "#EF4444",
    fontSize: 12,
  },
});