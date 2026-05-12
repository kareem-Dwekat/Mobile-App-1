import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ADD_PRODUCT_COLORS, ADD_PRODUCT_STEPS } from "../../constants/addProduct";

type Props = {
  currentStep: number;
};

export default function Stepper({ currentStep }: Props) {
  return (
    <View style={styles.container}>
      {ADD_PRODUCT_STEPS.map((step) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;

        return (
          <View key={step.id} style={styles.item}>
            
            <View
              style={[
                styles.circle,
                isActive && styles.activeCircle,
                isDone && styles.doneCircle,
              ]}
            >
              <Text style={[styles.circleText, (isActive || isDone) && styles.activeText]}>
                {step.id}
              </Text>
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {step.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  item: {
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: ADD_PRODUCT_COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  activeCircle: {
    backgroundColor: ADD_PRODUCT_COLORS.primary,
    borderColor: ADD_PRODUCT_COLORS.primary,
  },
  doneCircle: {
    backgroundColor: ADD_PRODUCT_COLORS.success,
    borderColor: ADD_PRODUCT_COLORS.success,
  },
  circleText: {
    fontSize: 14,
    fontWeight: "700",
    color: ADD_PRODUCT_COLORS.text,
  },
  activeText: {
    color: "#fff",
  },
  label: {
    fontSize: 12,
    color: ADD_PRODUCT_COLORS.subText,
    textAlign: "center",
  },
  activeLabel: {
    color: ADD_PRODUCT_COLORS.text,
    fontWeight: "600",
  },
});