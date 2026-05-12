import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

import {
  PaymentFormData,
  PaymentFormErrors,
  PaymentMethod,
} from "../types/payment";

import { validatePaymentForm } from "../utils/paymentValidation";

import { createOrder } from "../services/orders.service";
import { createPaymentHistory } from "../services/paymentHistory.service";

import { SHIPPING_ADDRESS } from "../constants/payment";

import { CartItemType } from "../types/cart";

type UsePaymentProps = {
  userId: string | null;
  cartItems: CartItemType[];
  clearCart: () => Promise<boolean>;
};

export default function usePayment({
  userId,
  cartItems,
  clearCart,
}: UsePaymentProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("stripe");

  const [selectedAddress, setSelectedAddress] =
    useState(true);

  const [formData, setFormData] =
    useState<PaymentFormData>({
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
    });

  const [errors, setErrors] =
    useState<PaymentFormErrors>({});

  const updateField = (
    field: keyof PaymentFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const changePaymentMethod = (
    method: PaymentMethod
  ) => {
    setSelectedMethod(method);
    setErrors({});
  };

  const toggleAddress = () => {
    setSelectedAddress((prev) => !prev);
  };

  const validate = () => {
    const validationErrors =
      validatePaymentForm(
        selectedMethod,
        formData
      );

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors)
        .length === 0
    );
  };

  const paymentMutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error(
          "Please login before payment"
        );
      }

      if (cartItems.length === 0) {
        throw new Error(
          "Your cart is empty"
        );
      }

      if (!selectedAddress) {
        throw new Error(
          "Please select a shipping address"
        );
      }

      const order = await createOrder({
        userId,
        cartItems,
        paymentMethod: selectedMethod,
        shippingAddress:
          SHIPPING_ADDRESS,
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
    },

    onSuccess: () => {
      Alert.alert(
        "Success",
        "Payment completed successfully",
        [
          {
            text: "OK",
            onPress: () =>
              router.replace(
                "/payment-history"
              ),
          },
        ]
      );
    },

    onError: (error: any) => {
      console.log(
        "Payment error:",
        error
      );

      Alert.alert(
        "Error",
        error?.message ||
          "Payment failed. Please try again."
      );
    },
  });

  return {
    selectedMethod,
    setSelectedMethod:
      changePaymentMethod,

    selectedAddress,
    toggleAddress,

    formData,
    updateField,

    errors,
    validate,

    processPayment: () =>
      paymentMutation.mutate(),

    processing:
      paymentMutation.isPending,
  };
}