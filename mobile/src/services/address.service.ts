import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    writeBatch,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Address } from "../types/address";

const USERS_COLLECTION = "users";
const ADDRESSES_COLLECTION = "addresses";

export type AddressInput = Omit<Address, "id" | "isActive">;

const getAddressesCollection = (userId: string) =>
  collection(db, USERS_COLLECTION, userId, ADDRESSES_COLLECTION);

export const subscribeToAddresses = (
  userId: string,
  callback: (addresses: Address[]) => void
) => {
  const addressesQuery = query(
    getAddressesCollection(userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    addressesQuery,
    (snapshot) => {
      const addresses = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: typeof data.title === "string" ? data.title : "",
          country: typeof data.country === "string" ? data.country : "",
          state: typeof data.state === "string" ? data.state : "",
          city: typeof data.city === "string" ? data.city : "",
          addressLine1:
            typeof data.addressLine1 === "string" ? data.addressLine1 : "",
          addressLine2:
            typeof data.addressLine2 === "string" ? data.addressLine2 : undefined,
          zipCode: typeof data.zipCode === "string" ? data.zipCode : "",
          isActive: Boolean(data.isActive),
        } as Address;
      });

      callback(addresses);
    },
    (error) => {
      console.error("Error loading addresses:", error);
      callback([]);
    }
  );
};

export const addUserAddress = async (userId: string, address: AddressInput) => {
  await addDoc(getAddressesCollection(userId), {
    ...address,
    isActive: false,
    createdAt: serverTimestamp(),
  });
};

export const deleteUserAddress = async (userId: string, addressId: string) => {
  await deleteDoc(
    doc(db, USERS_COLLECTION, userId, ADDRESSES_COLLECTION, addressId)
  );
};

export const setActiveUserAddress = async (
  userId: string,
  addressId: string
) => {
  const snapshot = await getDocs(getAddressesCollection(userId));
  const batch = writeBatch(db);

  snapshot.docs.forEach((docSnap) => {
    batch.update(docSnap.ref, { isActive: docSnap.id === addressId });
  });

  await batch.commit();
};