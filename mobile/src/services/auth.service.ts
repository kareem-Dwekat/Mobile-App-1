import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";


export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  const userUid = userCredential.user.uid;
  const userDoc = await getDoc(doc(db, "users", userUid));

  return {
    user: userCredential.user,
    userData: userDoc.exists() ? userDoc.data() : null,
  };
};


export const signupUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    fullName,
    email: email.trim(),
    createdAt: new Date().toISOString(),
  });

  return user;
};



export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email.trim());
};