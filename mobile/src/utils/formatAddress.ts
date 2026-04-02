import { Address } from "../types/address";

export const formatAddress = (address: Address) => {
  return `${address.street}, ${address.city}, ${address.state}, ${address.country}`;
};