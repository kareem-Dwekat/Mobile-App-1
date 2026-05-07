import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { WishlistItemType } from "../types/wishlist";
import {
  subscribeToWishlist,
  toggleWishlistItemSelected,
  updateWishlistItemQuantity,
  toggleSelectAllWishlistItems,
  removeItemFromWishlistFirebase,
  addItemToWishlistFirebase,
} from "../services/wishlist.service";

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItemType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // الاستماع لحالة تسجيل الدخول
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid ?? null);
    });
    return () => unsubAuth();
  }, []);

  // مزامنة مع Firebase Wishlist عند تغيير المستخدم
  useEffect(() => {
    if (!userId) {
      setItems([]);
      return;
    }

    const unsubscribe = subscribeToWishlist(userId, (wishlistItems) => {
      setItems(wishlistItems);
    });

    return () => unsubscribe();
  }, [userId]);

  const toggleSelect = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item || !userId) return;
    const newSelected = !item.selected;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: newSelected } : i))
    );
    toggleWishlistItemSelected(userId, id, newSelected);
  };

  const changeQty = (id: string, type: "inc" | "dec") => {
    const item = items.find((i) => i.id === id);
    if (!item || !userId) return;
    const finalQty = Math.max(1, type === "inc" ? item.qty + 1 : item.qty - 1);
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: finalQty } : i))
    );
    updateWishlistItemQuantity(userId, id, finalQty);
  };

  const toggleSelectAll = () => {
    if (!userId) return;
    const allSelected = items.length > 0 && items.every((i) => i.selected);
    const newSelected = !allSelected;
    setItems((prev) => prev.map((i) => ({ ...i, selected: newSelected })));
    toggleSelectAllWishlistItems(userId, newSelected);
  };

  const handleDeleteSelected = () => {
    if (!userId) return;
    const selectedIds = items.filter((i) => i.selected).map((i) => i.id);
    setItems((prev) => prev.filter((i) => !i.selected));
    selectedIds.forEach((id) => removeItemFromWishlistFirebase(userId, id));
  };

  const addToWishlist = (item: WishlistItemType) => {
    if (!userId) return;
    addItemToWishlistFirebase(userId, item);
  };

  const handleAddToCart = (addToCartFn: (items: any[]) => void) => {
    const selectedItems = items
      .filter((i) => i.selected)
      .map((i) => ({
        id: i.id,
        title: i.title,
        category: i.category,
        price: i.price,
        image: i.image,
        qty: i.qty,
      }));

    if (selectedItems.length === 0) return;

    addToCartFn(selectedItems);
    setItems((prev) => prev.filter((i) => !i.selected));
  };

  const removeFromWishlist = (id: string) => {
    if (!userId) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    removeItemFromWishlistFirebase(userId, id);
  };

  return {
    items,
    userId,
    toggleSelect,
    changeQty,
    toggleSelectAll,
    handleDeleteSelected,
    addToWishlist,
    removeFromWishlist,
    handleAddToCart,
  };
};
