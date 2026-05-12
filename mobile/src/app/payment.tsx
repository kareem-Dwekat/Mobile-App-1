import React, { useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { useForm } from "react-hook-form";

import PaymentHeader from "../components/payment/PaymentHeader";
import ShippingAddressCard from "../components/payment/ShippingAddressCard";
import TotalCard from "../components/payment/TotalCard";
import PaymentMethodCard from "../components/payment/PaymentMethodCard";
import PaymentDetailsForm from "../components/payment/paymentDetailsform";
import PaymentFooter from "../components/payment/PaymentFooter";

import { useCart } from "../hooks/CartContext";
import usePayment from "../hooks/usePayment";

import {
  PAYMENT_COLORS,
  PAYMENT_OPTIONS,
  SHIPPING_ADDRESS,
} from "../constants/payment";

import {
  PaymentFormData,
} from "../types/payment";

import { calculateCartTotal } from "../services/orders.service";

export default function PaymentScreen() {
  const {
    cartItems,
    clearCart,
    userId,
  } = useCart();

  const {
    selectedMethod,
    setSelectedMethod,

    selectedAddress,
    toggleAddress,

    processing,
    processPayment,
  } = usePayment({
    userId,
    cartItems,
    clearCart,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    defaultValues: {
      paypalEmail: "",

      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",

      razorpayPhone: "",
      razorpayUpi: "",

      flutterwaveFullName: "",
      flutterwaveEmail: "",
      flutterwavePhone: "",
    },
  });

  const paymentSummary =
    useMemo(() => {
      const subtotal =
        calculateCartTotal(
          cartItems
        );

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
      : selectedMethod ===
        "stripe"
      ? "Pay by Stripe"
      : selectedMethod ===
        "razorpay"
      ? "Pay by Razorpay"
      : "Pay by Flutterwave";

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <PaymentHeader />

        <ShippingAddressCard
          address={
            SHIPPING_ADDRESS
          }
          selected={
            selectedAddress
          }
          onSelect={toggleAddress}
        />

        <TotalCard
          summary={paymentSummary}
        />

        <Text
          style={
            styles.sectionTitle
          }
        >
          Select payment gateway
        </Text>

        {PAYMENT_OPTIONS.map(
          (item) => (
            <PaymentMethodCard
              key={item.id}
              id={item.id}
              label={item.label}
              selected={
                selectedMethod ===
                item.id
              }
              onPress={() =>
                setSelectedMethod(
                  item.id
                )
              }
            />
          )
        )}

        <PaymentDetailsForm
          selectedMethod={
            selectedMethod
          }
          control={control}
          errors={errors}
        />

        <PaymentFooter
          total={
            paymentSummary.totalPayment
          }
          buttonTitle={
            processing
              ? "Processing..."
              : buttonTitle
          }
          onPay={handleSubmit(
            processPayment
          )}
          disabled={processing}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor:
        PAYMENT_COLORS.background,
    },

    container: {
      flex: 1,
      backgroundColor:
        PAYMENT_COLORS.background,
    },

    content: {
      padding: 16,
      paddingBottom: 30,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color:
        PAYMENT_COLORS.text,
      marginBottom: 14,
    },
  });