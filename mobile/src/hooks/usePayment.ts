import { useState } from "react";
import {
  PaymentFormData,
  PaymentFormErrors,
  PaymentMethod,
} from "../types/payment";
import { validatePaymentForm } from "../utils/paymentValidation";

export default function usePayment() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("stripe");
  const [selectedAddress, setSelectedAddress] = useState(true);

  const [formData, setFormData] = useState<PaymentFormData>({
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

  const [errors, setErrors] = useState<PaymentFormErrors>({});

  const updateField = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const changePaymentMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setErrors({});
  };

  const toggleAddress = () => {
    setSelectedAddress((prev) => !prev);
  };

  const validate = () => {
    const validationErrors = validatePaymentForm(selectedMethod, formData);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  return {
    selectedMethod,
    setSelectedMethod: changePaymentMethod,
    selectedAddress,
    toggleAddress,
    formData,
    updateField,
    errors,
    validate,
  };
}