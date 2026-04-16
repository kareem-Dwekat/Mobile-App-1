import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Product, ProductFormData } from "../types/addProduct";

type SaveProductParams = {
  formData: ProductFormData;
  images: string[];
};

export const saveProductToFirestore = async ({
  formData,
  images,
}: SaveProductParams) => {
  const product = {
    productName: formData.productName.trim(),
    description: formData.description.trim(),
    price: Number(formData.price),
    stock: Number(formData.stock),
    category: formData.category.trim(),
    brand: formData.brand.trim(),
    images,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "products"), product);

  return {
    id: docRef.id,
    ...product,
  };
};

export const getProductsFromFirestore = async (): Promise<Product[]> => {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      productName: data.productName ?? "",
      description: data.description ?? "",
      price: data.price ?? 0,
      stock: data.stock ?? 0,
      category: data.category ?? "",
      brand: data.brand ?? "",
      images: data.images ?? [],
      createdAt: data.createdAt ?? null,
    } as Product;
  });
};