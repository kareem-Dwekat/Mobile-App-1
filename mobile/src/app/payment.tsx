import React from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import PaymentHeader from "../components/payment/PaymentHeader";
import ShippingAddressCard from "../components/payment/ShippingAddressCard";
import TotalCard from "../components/payment/TotalCard";
import PaymentMethodCard from "../components/payment/PaymentMethodCard";
import PaymentDetailsForm from "../components/payment/paymentDetailsform";
import PaymentFooter from "../components/payment/PaymentFooter";

import {
  PAYMENT_COLORS,
  PAYMENT_OPTIONS,
  PAYMENT_SUMMARY,
  SHIPPING_ADDRESS,
} from "../constants/payment";

import usePayment from "../hooks/usePayment";

export default function PaymentScreen() {
  const {
    selectedMethod,
    setSelectedMethod,
    formData,
    updateField,
    errors,
    validate,
    selectedAddress,
    toggleAddress,
  } = usePayment();

  const buttonTitle =
    selectedMethod === "paypal"
      ? "Pay by PayPal"
      : selectedMethod === "stripe"
      ? "Pay by Stripe"
      : selectedMethod === "razorpay"
      ? "Pay by Razorpay"
      : "Pay by Flutterwave";

  const handlePay = () => {
    if (!selectedAddress) {
      Alert.alert("Error", "Please select a shipping address");
      return;
    }

    const isValid = validate();

    if (!isValid) {
      Alert.alert(
        "Validation Error",
        "Please fill in the required fields correctly."
      );
      return;
    }

    Alert.alert("Success", `Payment completed with ${selectedMethod}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <PaymentHeader />

        {/* Shipping Address */}
        <ShippingAddressCard
          address={SHIPPING_ADDRESS}
          selected={selectedAddress}
          onSelect={toggleAddress}
        />

        {/* Total */}
        <TotalCard summary={PAYMENT_SUMMARY} />

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Select payment gateway</Text>

        {PAYMENT_OPTIONS.map((item) => (
          <PaymentMethodCard
            key={item.id}
            id={item.id}
            label={item.label}
            selected={selectedMethod === item.id}
            onPress={() => setSelectedMethod(item.id)}
          />
        ))}

        {/* Dynamic Form */}
        <PaymentDetailsForm
          selectedMethod={selectedMethod}
          formData={formData}
          errors={errors}
          updateField={updateField}
        />

        {/* Footer */}
        <PaymentFooter
          total={PAYMENT_SUMMARY.totalPayment}
          buttonTitle={buttonTitle}
          onPay={handlePay}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PAYMENT_COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: PAYMENT_COLORS.background,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: PAYMENT_COLORS.text,
    marginBottom: 14,
  },
});