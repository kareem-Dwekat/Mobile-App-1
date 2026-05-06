import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjfTxqzltgwHC3kx4W-GLI6qLC9l1zId0",
  authDomain: "mobileapp-6cffc.firebaseapp.com",
  databaseURL: "https://mobileapp-6cffc-default-rtdb.firebaseio.com",
  projectId: "mobileapp-6cffc",
  storageBucket: "mobileapp-6cffc.firebasestorage.app",
  messagingSenderId: "217139558620",
  appId: "1:217139558620:web:455fcb54992134bf005c19",
  measurementId: "G-FYM8Q3N1GH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);