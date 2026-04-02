import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ADD_PRODUCT_COLORS } from "../../constants/addProduct";

type Props = {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export default function AddProductFooter({
  currentStep,
  onBack,
  onNext,
  onSubmit,
}: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={onBack}
      >
        <Text style={[styles.buttonText, styles.secondaryText]}>Back</Text>
      </TouchableOpacity>

      {currentStep < 3 ? (
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={onNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryText: {
    color: ADD_PRODUCT_COLORS.text,
  },
});