import { useState } from "react";
import { Address } from "../types/address";
import { MOCK_ADDRESSES } from "../constants/mockData";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);

  const setActiveAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isActive: item.id === id,
      }))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  const addAddress = (newAddress: Omit<Address, "id" | "isActive">) => {
    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
      isActive: false,
    };

    setAddresses((prev) => [address, ...prev]);
  };

  return {
    addresses,
    setActiveAddress,
    deleteAddress,
    addAddress,
  };
};