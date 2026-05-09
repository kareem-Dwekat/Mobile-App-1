import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    where,
  } from "firebase/firestore";
  import { db } from "../config/firebaseConfig";
  import { CartItemType } from "../types/cart";
  
  export const createPaymentHistory = async ({
    userId,
    orderIds,
    cartItems,
    amount,
    paymentMethod,
    status,
  }: {
    userId: string;
    orderIds: string[];
    cartItems: CartItemType[];
    amount: number;
    paymentMethod: string;
    status: string;
  }) => {
    const totalItems = cartItems.reduce(
      (sum: number, item: any) => sum + (item.qty || 1),
      0
    );
  
    const docRef = await addDoc(collection(db, "paymentHistory"), {
      userId,
      orderIds,
      items: totalItems,
      amount,
      paymentMethod,
      status,
      createdAt: serverTimestamp(),
    });
  
    console.log("Saved payment history id:", docRef.id);
  
    return docRef.id;
  };
  
  export const getPaymentHistory = async (userId: string) => {
    const q = query(
      collection(db, "paymentHistory"),
      where("userId", "==", userId)
    );
  
    const snapshot = await getDocs(q);
  
    return snapshot.docs
      .map((paymentDoc) => ({
        id: paymentDoc.id,
        ...paymentDoc.data(),
      }))
      .sort((a: any, b: any) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });
  };
  
  export const getPaymentHistoryById = async (paymentId: string) => {
    const docRef = doc(db, "paymentHistory", paymentId);
    const snapshot = await getDoc(docRef);
  
    if (!snapshot.exists()) {
      return null;
    }
  
    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  };