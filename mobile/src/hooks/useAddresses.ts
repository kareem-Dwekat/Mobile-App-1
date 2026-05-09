import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import {
  addUserAddress,
  deleteUserAddress,
  setActiveUserAddress,
  subscribeToAddresses,
} from "../services/address.service";
import { Address } from "../types/address";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    let unsubscribeAddresses = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeAddresses();

      if (!user) {
        setAddresses([]);
        return;
      }

      unsubscribeAddresses = subscribeToAddresses(user.uid, setAddresses);
    });

    return () => {
      unsubscribeAddresses();
      unsubscribeAuth();
    };
  }, []);

  const setActiveAddress = (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    setActiveUserAddress(user.uid, id).catch((error) => {
      console.warn("Failed to set active address:", error);
    });
  };

  const deleteAddress = (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    deleteUserAddress(user.uid, id).catch((error) => {
      console.warn("Failed to delete address:", error);
    });
  };

  const addAddress = (newAddress: Omit<Address, "id" | "isActive">) => {
    const user = auth.currentUser;
    if (!user) return;

    addUserAddress(user.uid, newAddress).catch((error) => {
      console.warn("Failed to add address:", error);
    });
  };

  return {
    addresses,
    setActiveAddress,
    deleteAddress,
    addAddress,
  };
};