import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ADD_PRODUCT_COLORS } from "../../constants/addProduct";

type Props = {
  label: string;
  value: string;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
  error?: string;
  onChangeText: (value: string) => void;
};

export default function FormInput({
  label,
  value,
  placeholder,
  multiline = false,
  keyboardType = "default",
  error,
  onChangeText,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={ADD_PRODUCT_COLORS.placeholder}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        style={[
          styles.input,
          multiline && styles.textArea,
          !!error && styles.inputError,
        ]}
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: ADD_PRODUCT_COLORS.text,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: ADD_PRODUCT_COLORS.border,
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    fontSize: 15,
    color: ADD_PRODUCT_COLORS.text,
  },
  textArea: {
    height: 110,
    textAlignVertical: "top",
    paddingTop: 14,
  },
  inputError: {
    borderColor: ADD_PRODUCT_COLORS.error,
  },
  errorText: {
    marginTop: 6,
    color: ADD_PRODUCT_COLORS.error,
    fontSize: 12,
  },
});