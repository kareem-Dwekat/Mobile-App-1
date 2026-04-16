import { useState, useEffect } from "react";
import { WishlistItemType } from "../types/wishlist";
import { initialWishlistData } from "../constants/wishlist";
import {
  subscribeToWishlist,
  toggleWishlistItemSelected,
  updateWishlistItemQuantity,
  toggleSelectAllWishlistItems,
  removeItemFromWishlistFirebase,
  saveWishlistItems,
} from "../services/wishlist.service";

const DEMO_USER_ID = "demo-user-123";

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItemType[]>(initialWishlistData);

  // مزامنة مع Firebase عند التحميل
  useEffect(() => {
    const unsubscribe = subscribeToWishlist(DEMO_USER_ID, (wishlistItems) => {
      if (wishlistItems.length > 0) {
        setItems(wishlistItems);
      } else {
        // إذا Firebase فارغ، احفظ البيانات الأصلية
        saveWishlistItems(DEMO_USER_ID, initialWishlistData);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleSelect = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const newSelected = !item.selected;
      // تحديث محلي
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, selected: newSelected } : item
        )
      );
      // مزامنة مع Firebase (بالخلفية)
      toggleWishlistItemSelected(DEMO_USER_ID, id, newSelected);
    }
  };

  const changeQty = (id: string, type: "inc" | "dec") => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
      const finalQty = Math.max(1, newQty);
      // تحديث محلي
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, qty: finalQty } : item
        )
      );
      // مزامنة مع Firebase (بالخلفية)
      updateWishlistItemQuantity(DEMO_USER_ID, id, finalQty);
    }
  };

  const toggleSelectAll = () => {
    const allSelected = items.length > 0 && items.every((item) => item.selected);
    const newSelected = !allSelected;
    // تحديث محلي
    setItems((prev) =>
      prev.map((item) => ({ ...item, selected: newSelected }))
    );
    // مزامنة مع Firebase (بالخلفية)
    toggleSelectAllWishlistItems(DEMO_USER_ID, newSelected);
  };

  const handleDeleteSelected = () => {
    const selectedIds = items.filter((item) => item.selected).map((item) => item.id);
    // تحديث محلي
    setItems((prev) => prev.filter((item) => !item.selected));
    // مزامنة مع Firebase (بالخلفية)
    selectedIds.forEach((id) => removeItemFromWishlistFirebase(DEMO_USER_ID, id));
  };

  const handleAddToCart = (addToCartFn: (items: any[]) => void) => {
    const selectedItems = items
      .filter((item) => item.selected)
      .map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        price: item.price,
        image: item.image,
        qty: item.qty,
      }));

    if (selectedItems.length === 0) return;

    addToCartFn(selectedItems);
    setItems((prev) => prev.filter((item) => !item.selected));
  };

  return {
    items,
    toggleSelect,
    changeQty,
    toggleSelectAll,
    handleDeleteSelected,
    handleAddToCart,
  };
};
