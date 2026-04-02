import {
    PaymentOption,
    PaymentSummary,
    ShippingAddress,
  } from "../types/payment";
  
  export const SHIPPING_ADDRESS: ShippingAddress = {
    country: "Australia",
    city: "Melbourne",
    state: "Victoria (VIC)",
    zipCode: "5000",
    fullAddress: "210 Collins Street",
  };
  
  export const PAYMENT_SUMMARY: PaymentSummary = {
    vat: 23,
    shippingCosts: 105,
    totalPayment: 1027.99,
  };
  
  export const PAYMENT_OPTIONS: PaymentOption[] = [
    { id: "paypal", label: "PayPal" },
    { id: "stripe", label: "Stripe" },
    { id: "razorpay", label: "Razorpay" },
    { id: "flutterwave", label: "Flutterwave" },
  ];
  
  export const PAYMENT_COLORS = {
    background: "#F8F8F8",
    white: "#FFFFFF",
    text: "#111111",
    subText: "#666666",
    border: "#E4E4E4",
    green: "#22C55E",
    greenBorder: "#A7E7BE",
    yellow: "#F4C430",
    radio: "#999999",
  };