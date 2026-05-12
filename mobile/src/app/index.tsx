import { useEffect } from "react";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function IndexScreen() {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/home"); 
      } else {
        router.replace("/login");
      }
    });

    return unsubscribe;
  }, []);

  return null;
}