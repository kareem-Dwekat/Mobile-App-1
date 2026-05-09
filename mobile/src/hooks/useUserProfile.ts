import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceEventEmitter } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import {
  getProfileFallback,
  saveUserPhoto,
  saveUserProfile,
  subscribeToUserProfile,
} from "../services/profile.service";
import { UserProfileData } from "../types/profile";

const getCachedPhotoKey = (userId: string) => `profile_photo_${userId}`;
const PROFILE_PHOTO_UPDATED_EVENT = "profilePhotoUpdated";

const getDisplayPhotoURL = (photoURL: string, base64?: string) => {
  if (base64) return `data:image/jpeg;base64,${base64}`;
  return photoURL;
};

type ProfilePhotoUpdatedEvent = {
  userId: string;
  photoURL: string;
};

export const useUserProfile = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfileData>(getProfileFallback());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeProfile?.();
      unsubscribeProfile = undefined;

      if (!user) {
        setUserId(null);
        setProfile(getProfileFallback());
        setLoading(false);
        return;
      }

      setUserId(user.uid);
      setLoading(true);
      AsyncStorage.getItem(getCachedPhotoKey(user.uid)).then((cachedPhoto) => {
        if (cachedPhoto) {
          setProfile((prev) => ({ ...prev, photoURL: cachedPhoto }));
        }
      });

      unsubscribeProfile = subscribeToUserProfile(user.uid, async (data) => {
        const cachedPhoto = await AsyncStorage.getItem(getCachedPhotoKey(user.uid));
        const displayPhoto = data.photoURL || cachedPhoto || "";

        setProfile({
          ...data,
          photoURL: displayPhoto,
        });

        if (data.photoURL) {
          await AsyncStorage.setItem(getCachedPhotoKey(user.uid), data.photoURL);
        }

        setLoading(false);
      });
    });

    return () => {
      unsubscribeProfile?.();
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (!userId) return;

    const subscription = DeviceEventEmitter.addListener(
      PROFILE_PHOTO_UPDATED_EVENT,
      (event: ProfilePhotoUpdatedEvent) => {
        if (event.userId !== userId) return;
        setProfile((prev) => ({ ...prev, photoURL: event.photoURL }));
      }
    );

    return () => subscription.remove();
  }, [userId]);

  const updateProfileData = async (data: UserProfileData) => {
    if (!userId) return;
    const cacheKey = getCachedPhotoKey(userId);
    const photoURL = data.photoURL || profile.photoURL;
    const optimisticProfile = { ...data, photoURL };

    setProfile(optimisticProfile);

    if (photoURL) {
      await AsyncStorage.setItem(cacheKey, photoURL);
      DeviceEventEmitter.emit(PROFILE_PHOTO_UPDATED_EVENT, {
        userId,
        photoURL,
      });
    }

    const savedProfile = await saveUserProfile(userId, optimisticProfile);

    setProfile(savedProfile);

    if (savedProfile.photoURL) {
      await AsyncStorage.setItem(cacheKey, savedProfile.photoURL);
      DeviceEventEmitter.emit(PROFILE_PHOTO_UPDATED_EVENT, {
        userId,
        photoURL: savedProfile.photoURL,
      });
    }
  };

  const updatePhoto = async (photoURL: string, base64?: string) => {
    if (!userId) return;
    const cacheKey = getCachedPhotoKey(userId);
    const displayPhotoURL = getDisplayPhotoURL(photoURL, base64);

    setProfile((prev) => ({ ...prev, photoURL: displayPhotoURL }));
    await AsyncStorage.setItem(cacheKey, displayPhotoURL);
    DeviceEventEmitter.emit(PROFILE_PHOTO_UPDATED_EVENT, {
      userId,
      photoURL: displayPhotoURL,
    });

    const savedPhotoURL = await saveUserPhoto(userId, photoURL, base64);

    setProfile((prev) => ({ ...prev, photoURL: savedPhotoURL }));
    await AsyncStorage.setItem(cacheKey, savedPhotoURL);
    DeviceEventEmitter.emit(PROFILE_PHOTO_UPDATED_EVENT, {
      userId,
      photoURL: savedPhotoURL,
    });
  };

  return {
    userId,
    profile,
    loading,
    updateProfileData,
    updatePhoto,
  };
};
