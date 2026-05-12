import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "@/constants/Profile";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: Option[];
  error?: string;
}

export default function ProfileSelect({
  label,
  selectedValue,
  onValueChange,
  items,
  error,
}: Props) {
  const selectedLabel =
    items.find((item) => item.value === selectedValue)?.label || selectedValue;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.pickerContainer, error ? styles.inputError : null]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(value) => onValueChange(String(value))}
          style={styles.picker}
          dropdownIconColor={COLORS.text}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.selectedText}>Selected: {selectedLabel}</Text>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: COLORS.background,
    justifyContent: "center",
  },
  picker: {
    height: 56,
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
  selectedText: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
  },
});