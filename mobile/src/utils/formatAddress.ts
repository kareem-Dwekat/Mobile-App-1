import { Address } from "../types/address";

export const formatAddress = (address: Address) => {
  return `${address.addressLine1}, ${address.city}, ${address.state}, ${address.country}`;
};