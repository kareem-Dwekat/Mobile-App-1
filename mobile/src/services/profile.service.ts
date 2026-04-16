import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { ProfileFormData } from "../types/profile";

const USERS_COLLECTION = "users";

const toSafeString = (value: unknown): string => {
  return typeof value === "string" ? value : "";
};

const getCurrentUserOrThrow = () => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user found. Please login again.");
  }

  return currentUser;
};

const buildDefaultProfile = (
  email: string,
  fallbackName: string
): ProfileFormData => ({
  email,
  password: "",
  zipCode: "",
  address: "",
  city: "",
  state: "",
  country: "",
  accountHolderName: fallbackName,
});

export const getCurrentUserProfile = async (): Promise<ProfileFormData> => {
  const currentUser = getCurrentUserOrThrow();
  const fallbackName =
    currentUser.displayName || currentUser.email?.split("@")[0] || "";
  const fallbackProfile = buildDefaultProfile(
    currentUser.email?.trim() || "",
    fallbackName
  );

  const userRef = doc(db, USERS_COLLECTION, currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return fallbackProfile;
  }

  const userData = userSnap.data();

  return {
    email: toSafeString(userData.email) || fallbackProfile.email,
    password: "",
    zipCode: toSafeString(userData.zipCode),
    address: toSafeString(userData.address),
    city: toSafeString(userData.city),
    state: toSafeString(userData.state),
    country: toSafeString(userData.country),
    accountHolderName:
      toSafeString(userData.accountHolderName) ||
      toSafeString(userData.fullName) ||
      fallbackProfile.accountHolderName,
  };
};

export const saveCurrentUserProfile = async (
  profile: ProfileFormData
): Promise<void> => {
  const currentUser = getCurrentUserOrThrow();
  const userRef = doc(db, USERS_COLLECTION, currentUser.uid);

  const accountHolderName = profile.accountHolderName.trim();
  const email = profile.email.trim() || currentUser.email?.trim() || "";

  await setDoc(
    userRef,
    {
      email,
      fullName: accountHolderName,
      accountHolderName,
      zipCode: profile.zipCode.trim(),
      address: profile.address.trim(),
      city: profile.city.trim(),
      state: profile.state.trim(),
      country: profile.country.trim(),
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
};