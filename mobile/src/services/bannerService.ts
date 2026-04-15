import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export interface BannerType {
  id: string;
  image: string;
  title?: string;
}

export const getBanners = async (): Promise<BannerType[]> => {
  const snap = await getDocs(collection(db, "banners"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BannerType[];
};