import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { PAYMENT_COLORS } from "../../constants/payment";
import { PaymentFormData, PaymentMethod } from "../../types/payment";

type Props = {
  selectedMethod: PaymentMethod;
  control: Control<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
};

type InputFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChangeText: (value: string) => void;
  onBlur?: () => void;
};

function InputField({
  label,
  value,
  placeholder,
  error,
  onChangeText,
  onBlur,
}: InputFieldProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor="#999"
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default function PaymentDetailsForm({
  selectedMethod,
  control,
  errors,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Payment Details</Text>

      {selectedMethod === "paypal" && (
        <Controller
          control={control}
          name="paypalEmail"
          rules={{ required: "PayPal email is required" }}
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="PayPal Email"
              value={value}
              placeholder="Enter your PayPal email"
              error={errors.paypalEmail?.message}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      )}

      {selectedMethod === "stripe" && (
        <>
          <Controller
            control={control}
            name="cardHolderName"
            rules={{ required: "Card holder name is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Card Holder Name"
                value={value}
                placeholder="Enter card holder name"
                error={errors.cardHolderName?.message}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="cardNumber"
            rules={{ required: "Card number is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Card Number"
                value={value}
                placeholder="1234567890123456"
                error={errors.cardNumber?.message}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="expiryDate"
            rules={{ required: "Expiry date is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Expiry Date"
                value={value}
                placeholder="MM/YY"
                error={errors.expiryDate?.message}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="cvv"
            rules={{ required: "CVV is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="CVV"
                value={value}
                placeholder="123"
                error={errors.cvv?.message}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </>
      )}

      {selectedMethod === "razorpay" && (
        <>
          <Controller
            control={control}
            name="razorpayPhone"
            rules={{ required: "Phone number is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Phone Number"
                value={value}
                placeholder="Enter phone number"
                error={errors.razorpayPhone?.message}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="razorpayUpi"
            rules={{ required: "UPI ID is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="UPI ID"
                value={value}
                placeholder="example@upi"
                error={errors.razorpayUpi?.message}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </>
      )}

      {selectedMethod === "flutterwave" && (
        <>
          <Controller
            control={control}
            name="flutterwaveFullName"
            rules={{ required: "Full name is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Full Name"
                value={value}
                placeholder="Enter full name"
                error={errors.flutterwaveFullName?.message}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="flutterwaveEmail"
            rules={{ required: "Email is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Email"
                value={value}
                placeholder="Enter email"
                error={errors.flutterwaveEmail?.message}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="flutterwavePhone"
            rules={{ required: "Phone number is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Phone Number"
                value={value}
                placeholder="Enter phone number"
                error={errors.flutterwavePhone?.message}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
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