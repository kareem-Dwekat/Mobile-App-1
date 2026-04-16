import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ADD_PRODUCT_COLORS } from "../../constants/addProduct";

type Props = {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function AddProductFooter({
  currentStep,
  onBack,
  onNext,
  onSubmit,
  disabled = false,
}: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.secondaryButton,
          disabled && styles.disabledButton,
        ]}
        onPress={onBack}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, styles.secondaryText]}>Back</Text>
      </TouchableOpacity>

      {currentStep < 3 ? (
        <TouchableOpacity
          style={[
            styles.button,
            styles.primaryButton,
            disabled && styles.disabledButton,
          ]}
          onPress={onNext}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            styles.primaryButton,
            disabled && styles.disabledButton,
          ]}
          onPress={onSubmit}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>
            {disabled ? "Uploading..." : "Submit"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: ADD_PRODUCT_COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: ADD_PRODUCT_COLORS.border,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryText: {
    color: ADD_PRODUCT_COLORS.text,
  },
});