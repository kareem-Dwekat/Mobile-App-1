import { useState } from "react";
import { Address } from "../types/address";
import { MOCK_ADDRESSES } from "../constants/mockData";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);

  const setActiveAddress = (id: string) => {
    const updated = addresses.map((item) => ({
      ...item,
      isActive: item.id === id,
    }));
    setAddresses(updated);
  };

  const deleteAddress = (id: string) => {
    const updated = addresses.filter((item) => item.id !== id);
    setAddresses(updated);
  };

  return {
    addresses,
    setActiveAddress,
    deleteAddress,
  };
};