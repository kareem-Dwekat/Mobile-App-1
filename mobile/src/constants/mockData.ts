import { Address } from "../types/address";

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "1",
    title: "Shipping address",
    street: "210 Collins Street",
    city: "Melbourne",
    state: "Victoria (VIC)",
    country: "Australia",
    zipCode: "5000",
    isActive: false,
  },
  {
    id: "2",
    title: "Shipping Address",
    street: "45 George Street",
    city: "Geelong",
    state: "Victoria (VIC)",
    country: "Australia",
    zipCode: "5000",
    isActive: true,
  },
  {
    id: "3",
    title: "Shipping address",
    street: "25 George Street",
    city: "Newcastle",
    state: "New South Wales (NSW)",
    country: "Australia",
    zipCode: "3000",
    isActive: false,
  },
];
