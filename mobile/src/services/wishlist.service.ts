import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { WishlistItemType } from "../types/wishlist";

const WISHLIST_COLLECTION = "wishlists";

/**
 * احصل على مرجع document المفضلة للمستخدم
 */
const getWishlistRef = (userId: string) => {
  return doc(db, WISHLIST_COLLECTION, userId);
};

/**
 * جلب محتويات المفضلة من Firebase
 */
export const fetchWishlistItems = async (
  userId: string
): Promise<WishlistItemType[]> => {
  try {
    const wishlistRef = getWishlistRef(userId);
    const wishlistSnap = await getDoc(wishlistRef);

    if (wishlistSnap.exists()) {
      const data = wishlistSnap.data();
      return data.items || [];
    }

    return [];
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }
};

/**
 * حفظ المفضلة بالكامل في Firebase
 */
export const saveWishlistItems = async (
  userId: string,
  items: WishlistItemType[]
): Promise<boolean> => {
  try {
    const wishlistRef = getWishlistRef(userId);
    await setDoc(
      wishlistRef,
      {
        items,
        updatedAt: new Date().toISOString(),
        userId,
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error("Error saving wishlist:", error);
    return false;
  }
};

/**
 * إضافة منتج للمفضلة
 */
export const addItemToWishlistFirebase = async (
  userId: string,
  item: WishlistItemType
): Promise<boolean> => {
  try {
    const currentItems = await fetchWishlistItems(userId);
    
    // تحقق إذا المنتج موجود مسبقاً
    const exists = currentItems.some((i) => i.id === item.id);
    if (exists) {
      return true; // المنتج موجود، لا حاجة للإضافة
    }

    const updatedItems = [...currentItems, { ...item, selected: false }];
    return await saveWishlistItems(userId, updatedItems);
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    return false;
  }
};

/**
 * حذف منتج من المفضلة
 */
export const removeItemFromWishlistFirebase = async (
  userId: string,
  itemId: string
): Promise<boolean> => {
  try {
    const currentItems = await fetchWishlistItems(userId);
    const updatedItems = currentItems.filter((item) => item.id !== itemId);

    return await saveWishlistItems(userId, updatedItems);
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    return false;
  }
};

/**
 * حذف عدة منتجات من المفضلة (المحددة)
 */
export const removeMultipleFromWishlistFirebase = async (
  userId: string,
  itemIds: string[]
): Promise<boolean> => {
  try {
    const currentItems = await fetchWishlistItems(userId);
    const updatedItems = currentItems.filter((item) => !itemIds.includes(item.id));

    return await saveWishlistItems(userId, updatedItems);
  } catch (error) {
    console.error("Error removing multiple items from wishlist:", error);
    return false;
  }
};

/**
 * تحديث حالة "محدد" لمنتج في المفضلة
 */
export const toggleWishlistItemSelected = async (
  userId: string,
  itemId: string,
  selected: boolean
): Promise<boolean> => {
  try {
    const currentItems = await fetchWishlistItems(userId);
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, selected } : item
    );

    return await saveWishlistItems(userId, updatedItems);
  } catch (error) {
    console.error("Error updating wishlist item selection:", error);
    return false;
  }
};

/**
 * تحديث الكمية لمنتج في المفضلة
 */
export const updateWishlistItemQuantity = async (
  userId: string,
  itemId: string,
  qty: number
): Promise<boolean> => {
  try {
    const currentItems = await fetchWishlistItems(userId);
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, qty: Math.max(1, qty) } : item
    );

    return await saveWishlistItems(userId, updatedItems);
  } catch (error) {
    console.error("Error updating wishlist item quantity:", error);
    return false;
  }
};

/**
 * تحديد/إلغاء تحديد كل المنتجات
 */
export const toggleSelectAllWishlistItems = async (
  userId: string,
  selected: boolean
): Promise<boolean> => {
  try {
    const currentItems = await fetchWishlistItems(userId);
    const updatedItems = currentItems.map((item) => ({ ...item, selected }));

    return await saveWishlistItems(userId, updatedItems);
  } catch (error) {
    console.error("Error selecting all wishlist items:", error);
    return false;
  }
};

/**
 * الاستماع للتغييرات في المفضلة (Realtime)
 */
export const subscribeToWishlist = (
  userId: string,
  callback: (items: WishlistItemType[]) => void
) => {
  const wishlistRef = getWishlistRef(userId);

  return onSnapshot(
    wishlistRef,
    (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        callback(data.items || []);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error("Error subscribing to wishlist:", error);
      callback([]);
    }
  );
};
