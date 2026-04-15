import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";


export const getCategories = async () => {
  const snap = await getDocs(collection(db, "categories"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export const getSubcategories = async (categoryId: string) => {
  const q = query(
    collection(db, "subcategories"),
    where("parentId", "==", categoryId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};