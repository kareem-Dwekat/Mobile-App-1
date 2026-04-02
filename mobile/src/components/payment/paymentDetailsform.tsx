import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { PAYMENT_COLORS } from "../../constants/payment";
import {
  PaymentFormData,
  PaymentFormErrors,
  PaymentMethod,
} from "../../types/payment";

type Props = {
  selectedMethod: PaymentMethod;
  formData: PaymentFormData;
  errors: PaymentFormErrors;
  updateField: (field: keyof PaymentFormData, value: string) => void;
};

type InputFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChangeText: (value: string) => void;
};

function InputField({
  label,
  value,
  placeholder,
  error,
  onChangeText,
}: InputFieldProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor="#999"
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default function PaymentDetailsForm({
  selectedMethod,
  formData,
  errors,
  updateField,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Payment Details</Text>

      {selectedMethod === "paypal" && (
        <InputField
          label="PayPal Email"
          value={formData.paypalEmail}
          placeholder="Enter your PayPal email"
          error={errors.paypalEmail}
          onChangeText={(value) => updateField("paypalEmail", value)}
        />
      )}

      {selectedMethod === "stripe" && (
        <>
          <InputField
            label="Card Holder Name"
            value={formData.cardHolderName}
            placeholder="Enter card holder name"
            error={errors.cardHolderName}
            onChangeText={(value) => updateField("cardHolderName", value)}
          />

          <InputField
            label="Card Number"
            value={formData.cardNumber}
            placeholder="1234567890123456"
            error={errors.cardNumber}
            onChangeText={(value) => updateField("cardNumber", value)}
          />

          <InputField
            label="Expiry Date"
            value={formData.expiryDate}
            placeholder="MM/YY"
            error={errors.expiryDate}
            onChangeText={(value) => updateField("expiryDate", value)}
          />

          <InputField
            label="CVV"
            value={formData.cvv}
            placeholder="123"
            error={errors.cvv}
            onChangeText={(value) => updateField("cvv", value)}
          />
        </>
      )}

      {selectedMethod === "razorpay" && (
        <>
          <InputField
            label="Phone Number"
            value={formData.razorpayPhone}
            placeholder="Enter phone number"
            error={errors.razorpayPhone}
            onChangeText={(value) => updateField("razorpayPhone", value)}
          />

          <InputField
            label="UPI ID"
            value={formData.razorpayUpi}
            placeholder="example@upi"
            error={errors.razorpayUpi}
            onChangeText={(value) => updateField("razorpayUpi", value)}
          />
        </>
      )}

      {selectedMethod === "flutterwave" && (
        <>
          <InputField
            label="Full Name"
            value={formData.flutterwaveFullName}
            placeholder="Enter full name"
            error={errors.flutterwaveFullName}
            onChangeText={(value) => updateField("flutterwaveFullName", value)}
          />

          <InputField
            label="Email"
            value={formData.flutterwaveEmail}
            placeholder="Enter email"
            error={errors.flutterwaveEmail}
            onChangeText={(value) => updateField("flutterwaveEmail", value)}
          />

          <InputField
            label="Phone Number"
            value={formData.flutterwavePhone}
            placeholder="Enter phone number"
            error={errors.flutterwavePhone}
            onChangeText={(value) => updateField("flutterwavePhone", value)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: PAYMENT_COLORS.white,
    borderWidth: 1,
    borderColor: PAYMENT_COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: PAYMENT_COLORS.text,
    marginBottom: 14,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: PAYMENT_COLORS.text,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: PAYMENT_COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    fontSize: 15,
    color: PAYMENT_COLORS.text,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#EF4444",
  },
});