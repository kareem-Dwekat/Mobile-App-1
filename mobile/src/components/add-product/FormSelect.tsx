import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ADD_PRODUCT_COLORS } from "../../constants/addProduct";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  error?: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
};

export default function FormSelect({
  label,
  value,
  options,
  error,
  onValueChange,
  onBlur,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.selectBox, error ? styles.selectError : null]}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => {
            onValueChange(itemValue);
            onBlur?.();
          }}
          style={styles.picker}
          dropdownIconColor={ADD_PRODUCT_COLORS.text}
        >
          <Picker.Item label="Select category" value="" color="#999" />
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

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
  selectBox: {
    borderWidth: 1,
    borderColor: ADD_PRODUCT_COLORS.border,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  picker: {
    height: 52,
    width: "100%",
    color: ADD_PRODUCT_COLORS.text,
  },
  selectError: {
    borderColor: ADD_PRODUCT_COLORS.error,
  },
  errorText: {
    marginTop: 6,
    color: ADD_PRODUCT_COLORS.error,
    fontSize: 12,
  },
});