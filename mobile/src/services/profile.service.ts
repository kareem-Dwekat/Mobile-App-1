import { updateEmail, updateProfile } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { auth, db, storage } from "../config/firebaseConfig";
import { UserProfileData } from "../types/profile";

const USERS_COLLECTION = "users";

const getUserRef = (userId: string) => doc(db, USERS_COLLECTION, userId);
const isRemotePhotoURL = (photoURL: string) => photoURL.startsWith("http");
const isDataPhotoURL = (photoURL: string) => photoURL.startsWith("data:image");

const uploadProfilePhoto = async (
  userId: string,
  photoURL: string,
  base64?: string
) => {
  if (!photoURL || isRemotePhotoURL(photoURL)) return photoURL;

  const imageRef = ref(storage, `profile-images/${userId}/${Date.now()}.jpg`);
  const base64Payload = base64 || photoURL.split("base64,")[1];

  if (isDataPhotoURL(photoURL) && base64Payload) {
    await uploadString(imageRef, base64Payload, "base64", {
      contentType: "image/jpeg",
    });
  } else {
    const response = await fetch(photoURL);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
  }

  return getDownloadURL(imageRef);
};

export const getProfileFallback = (): UserProfileData => {
  const user = auth.currentUser;
  const email = user?.email ?? "";
  const fullName = user?.displayName || email.split("@")[0] || "User";

  return {
    fullName,
    email,
    photoURL: user?.photoURL ?? "",
    zipCode: "5000",
    address: "Dhaka",
    city: "Melbourne",
    state: "Victoria (VIC)",
    country: "Australia",
  };
};

export const subscribeToUserProfile = (
  userId: string,
  callback: (profile: UserProfileData) => void
) => {
  return onSnapshot(
    getUserRef(userId),
    (snapshot) => {
      const fallback = getProfileFallback();

      if (!snapshot.exists()) {
        callback(fallback);
        return;
      }

      const data = snapshot.data();

      callback({
        fullName:
          typeof data.fullName === "string" && data.fullName.trim()
            ? data.fullName
            : fallback.fullName,
        email:
          typeof data.email === "string" && data.email.trim()
            ? data.email
            : fallback.email,
        photoURL:
          typeof data.photoURL === "string" ? data.photoURL : fallback.photoURL,
        zipCode:
          typeof data.zipCode === "string" ? data.zipCode : fallback.zipCode,
        address:
          typeof data.address === "string" ? data.address : fallback.address,
        city: typeof data.city === "string" ? data.city : fallback.city,
        state: typeof data.state === "string" ? data.state : fallback.state,
        country:
          typeof data.country === "string" ? data.country : fallback.country,
      });
    },
    (error) => {
      console.error("Error subscribing to profile:", error);
      callback(getProfileFallback());
    }
  );
};

export const saveUserProfile = async (
  userId: string,
  profile: UserProfileData
): Promise<UserProfileData> => {
  const currentUser = auth.currentUser;
  const savedPhotoURL = profile.photoURL
    ? await uploadProfilePhoto(userId, profile.photoURL)
    : "";

  const savedProfile: UserProfileData = {
    ...profile,
    email: profile.email.trim(),
    fullName: profile.fullName.trim(),
    photoURL: savedPhotoURL,
  };

  await setDoc(
    getUserRef(userId),
    {
      ...savedProfile,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  if (currentUser) {
    await updateProfile(currentUser, {
      displayName: savedProfile.fullName,
      photoURL: savedPhotoURL || null,
    });

    if (savedProfile.email && savedProfile.email !== currentUser.email) {
      try {
        await updateEmail(currentUser, savedProfile.email);
      } catch (error) {
        console.warn("Email was saved to profile but Auth update failed:", error);
      }
    }
  }

  return savedProfile;
};

export const saveUserPhoto = async (
  userId: string,
  photoURL: string,
  base64?: string
): Promise<string> => {
  const currentUser = auth.currentUser;
  const uploadedPhotoURL = await uploadProfilePhoto(userId, photoURL, base64);

  if (currentUser) {
    await updateProfile(currentUser, { photoURL: uploadedPhotoURL });
  }

  await setDoc(
    getUserRef(userId),
    {
      photoURL: uploadedPhotoURL,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return uploadedPhotoURL;
};
