import {
    PaymentFormData,
    PaymentFormErrors,
    PaymentMethod,
  } from "../types/payment";
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cardNumberRegex = /^\d{16}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^\d{3,4}$/;
  const phoneRegex = /^\d{8,15}$/;
  
  export function validatePaymentForm(
    method: PaymentMethod,
    formData: PaymentFormData
  ): PaymentFormErrors {
    const errors: PaymentFormErrors = {};
  
    if (method === "paypal") {
      if (!formData.paypalEmail.trim()) {
        errors.paypalEmail = "PayPal email is required";
      } else if (!emailRegex.test(formData.paypalEmail.trim())) {
        errors.paypalEmail = "Enter a valid email";
      }
    }
  
    if (method === "stripe") {
      if (!formData.cardHolderName.trim()) {
        errors.cardHolderName = "Card holder name is required";
      }
  
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = "Card number is required";
      } else if (!cardNumberRegex.test(formData.cardNumber.replace(/\s/g, ""))) {
        errors.cardNumber = "Card number must be 16 digits";
      }
  
      if (!formData.expiryDate.trim()) {
        errors.expiryDate = "Expiry date is required";
      } else if (!expiryRegex.test(formData.expiryDate.trim())) {
        errors.expiryDate = "Use MM/YY format";
      }
  
      if (!formData.cvv.trim()) {
        errors.cvv = "CVV is required";
      } else if (!cvvRegex.test(formData.cvv.trim())) {
        errors.cvv = "CVV must be 3 or 4 digits";
      }
    }
  
    if (method === "razorpay") {
      if (!formData.razorpayPhone.trim()) {
        errors.razorpayPhone = "Phone number is required";
      } else if (!phoneRegex.test(formData.razorpayPhone.trim())) {
        errors.razorpayPhone = "Enter a valid phone number";
      }
  
      if (!formData.razorpayUpi.trim()) {
        errors.razorpayUpi = "UPI ID is required";
      }
    }
  
    if (method === "flutterwave") {
      if (!formData.flutterwaveFullName.trim()) {
        errors.flutterwaveFullName = "Full name is required";
      }
  
      if (!formData.flutterwaveEmail.trim()) {
        errors.flutterwaveEmail = "Email is required";
      } else if (!emailRegex.test(formData.flutterwaveEmail.trim())) {
        errors.flutterwaveEmail = "Enter a valid email";
      }
  
      if (!formData.flutterwavePhone.trim()) {
        errors.flutterwavePhone = "Phone number is required";
      } else if (!phoneRegex.test(formData.flutterwavePhone.trim())) {
        errors.flutterwavePhone = "Enter a valid phone number";
      }
    }
  
    return errors;
  }