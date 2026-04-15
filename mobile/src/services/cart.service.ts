import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { CartItemType } from "../types/cart";

const CART_COLLECTION = "carts";

/**
 * احصل على مرجع document السلة للمستخدم
 */
const getCartRef = (userId: string) => {
  return doc(db, CART_COLLECTION, userId);
};

/**
 * جلب محتويات السلة من Firebase
 */
export const fetchCartItems = async (userId: string): Promise<CartItemType[]> => {
  try {
    const cartRef = getCartRef(userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const data = cartSnap.data();
      return data.items || [];
    }

    return [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

/**
 * حفظ السلة بالكامل في Firebase
 */
export const saveCartItems = async (
  userId: string,
  items: CartItemType[]
): Promise<boolean> => {
  try {
    const cartRef = getCartRef(userId);
    await setDoc(
      cartRef,
      {
        items,
        updatedAt: new Date().toISOString(),
        userId,
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error("Error saving cart:", error);
    return false;
  }
};

/**
 * إضافة منتج للسلة في Firebase
 */
export const addItemToCartFirebase = async (
  userId: string,
  item: CartItemType
): Promise<boolean> => {
  try {
    const currentItems = await fetchCartItems(userId);
    const existingIndex = currentItems.findIndex((i) => i.id === item.id);

    let updatedItems: CartItemType[];

    if (existingIndex !== -1) {
      // المنتج موجود، زود الكمية
      updatedItems = currentItems.map((i, index) =>
        index === existingIndex ? { ...i, qty: i.qty + item.qty } : i
      );
    } else {
      // منتج جديد
      updatedItems = [...currentItems, item];
    }

    return await saveCartItems(userId, updatedItems);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return false;
  }
};

/**
 * إضافة عدة منتجات للسلة (من المفضلة مثلاً)
 */
export const addMultipleItemsToCartFirebase = async (
  userId: string,
  items: CartItemType[]
): Promise<boolean> => {
  try {
    const currentItems = await fetchCartItems(userId);
    let updatedItems = [...currentItems];

    items.forEach((newItem) => {
      const existingIndex = updatedItems.findIndex((i) => i.id === newItem.id);

      if (existingIndex !== -1) {
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          qty: updatedItems[existingIndex].qty + newItem.qty,
        };
      } else {
        updatedItems.push(newItem);
      }
    });

    return await saveCartItems(userId, updatedItems);
  } catch (error) {
    console.error("Error adding multiple items to cart:", error);
    return false;
  }
};

/**
 * حذف منتج من السلة
 */
export const removeItemFromCartFirebase = async (
  userId: string,
  itemId: string
): Promise<boolean> => {
  try {
    const currentItems = await fetchCartItems(userId);
    const updatedItems = currentItems.filter((item) => item.id !== itemId);

    return await saveCartItems(userId, updatedItems);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return false;
  }
};

/**
 * تغيير كمية منتج في السلة
 */
export const updateCartItemQuantity = async (
  userId: string,
  itemId: string,
  qty: number
): Promise<boolean> => {
  try {
    const currentItems = await fetchCartItems(userId);
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, qty: Math.max(1, qty) } : item
    );

    return await saveCartItems(userId, updatedItems);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return false;
  }
};

/**
 * مسح السلة بالكامل
 */
export const clearCartFirebase = async (userId: string): Promise<boolean> => {
  try {
    return await saveCartItems(userId, []);
  } catch (error) {
    console.error("Error clearing cart:", error);
    return false;
  }
};

/**
 * الاستماع للتغييرات في السلة (Realtime)
 */
export const subscribeToCart = (
  userId: string,
  callback: (items: CartItemType[]) => void
) => {
  const cartRef = getCartRef(userId);

  return onSnapshot(
    cartRef,
    (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        callback(data.items || []);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error("Error subscribing to cart:", error);
      callback([]);
    }
  );
};
