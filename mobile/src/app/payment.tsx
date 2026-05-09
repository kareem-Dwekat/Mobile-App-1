import React, { useMemo, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";

import PaymentHeader from "../components/payment/PaymentHeader";
import ShippingAddressCard from "../components/payment/ShippingAddressCard";
import TotalCard from "../components/payment/TotalCard";
import PaymentMethodCard from "../components/payment/PaymentMethodCard";
import PaymentDetailsForm from "../components/payment/paymentDetailsform";
import PaymentFooter from "../components/payment/PaymentFooter";

import { useCart } from "../hooks/CartContext";
import { calculateCartTotal, createOrder } from "../services/orders.service";
import { createPaymentHistory } from "../services/paymentHistory.service";

import {
  PAYMENT_COLORS,
  PAYMENT_OPTIONS,
  SHIPPING_ADDRESS,
} from "../constants/payment";

import usePayment from "../hooks/usePayment";

export default function PaymentScreen() {
  const { cartItems, clearCart, userId } = useCart();
  const [processing, setProcessing] = useState(false);

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

  const paymentSummary = useMemo(() => {
    const subtotal = calculateCartTotal(cartItems);

    return {
      subtotal,
      vat: 0,
      shippingCosts: 0,
      totalPayment: subtotal,
    };
  }, [cartItems]);

  const buttonTitle =
    selectedMethod === "paypal"
      ? "Pay by PayPal"
      : selectedMethod === "stripe"
      ? "Pay by Stripe"
      : selectedMethod === "razorpay"
      ? "Pay by Razorpay"
      : "Pay by Flutterwave";

  const handlePay = async () => {
    if (!userId) {
      Alert.alert("Error", "Please login before payment");
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("Error", "Your cart is empty");
      return;
    }

    if (!selectedAddress) {
      Alert.alert("Error", "Please select a shipping address");
      return;
    }

    const isValid = validate();

    if (!isValid) {
      Alert.alert(
        "Validation Error",
        "Please fill in the payment details correctly."
      );
      return;
    }

    try {
      setProcessing(true);

      const order = await createOrder({
        userId,
        cartItems,
        paymentMethod: selectedMethod,
        shippingAddress: SHIPPING_ADDRESS,
      });

      await createPaymentHistory({
        userId,
        orderIds: [order.id],
        cartItems,
        amount: order.amount,
        paymentMethod: selectedMethod,
        status: "Paid",
      });

      await clearCart();

      Alert.alert("Success", "Payment completed successfully", [
        {
          text: "OK",
          onPress: () => router.replace("/payment-history"),
        },
      ]);
    } catch (error) {
      console.log("Payment error:", error);
      Alert.alert("Error", "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PaymentHeader />

        <ShippingAddressCard
          address={SHIPPING_ADDRESS}
          selected={selectedAddress}
          onSelect={toggleAddress}
        />

        <TotalCard summary={paymentSummary} />

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

        <PaymentDetailsForm
          selectedMethod={selectedMethod}
          formData={formData}
          errors={errors}
          updateField={updateField}
        />

        <PaymentFooter
          total={paymentSummary.totalPayment}
          buttonTitle={processing ? "Processing..." : buttonTitle}
          onPay={handlePay}
          disabled={processing}
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