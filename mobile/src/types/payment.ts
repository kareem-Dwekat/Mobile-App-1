export type PaymentMethod = "paypal" | "stripe" | "razorpay" | "flutterwave";

export type ShippingAddress = {
  country: string;
  city: string;
  state: string;
  zipCode: string;
  fullAddress: string;
};

export type PaymentSummary = {
  vat: number;
  shippingCosts: number;
  totalPayment: number;
};

export type PaymentOption = {
  id: PaymentMethod;
  label: string;
};

export type PaymentFormData = {
  paypalEmail: string;

  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;

  razorpayPhone: string;
  razorpayUpi: string;

  flutterwaveFullName: string;
  flutterwaveEmail: string;
  flutterwavePhone: string;
};

export type PaymentFormErrors = Partial<Record<keyof PaymentFormData, string>>;