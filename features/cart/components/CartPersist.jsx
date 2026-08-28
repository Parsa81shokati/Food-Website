//هماهنگ کردن سبد خرید کاربر مهمان و کاربر لاگین کرده
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hydrateCart } from "@/features/cart/cartSlice.js.jsx";
import { loadCart, saveCart, clearCart } from "@/features/cart/storage";
import useAuth from "@/features/auth/hooks/useAuth";

export default function CartPersist() {
  const [hydrated, setHydrated] = useState(false);

  const dispatch = useDispatch();

  const { user, loading } = useAuth();

  const cart = useSelector((state) => state.cart.selectedItems);

  useEffect(() => {
    if (loading) return;

    const guestCart = loadCart(null);

    const userCart = loadCart(user?.id);

    let finalCart = userCart;

    // اگر کاربر تازه لاگین کرده و سبد مهمان دارد
    if (user?.id && guestCart.length > 0) {
      const merged = [...userCart];

      guestCart.forEach((guestItem) => {
        const existing = merged.find((item) => item.id === guestItem.id);

        if (existing) {
          existing.quantity += guestItem.quantity;
        } else {
          merged.push(guestItem);
        }
      });

      finalCart = merged;

      saveCart(finalCart, user.id);

      clearCart(null);
    }

    dispatch(hydrateCart(finalCart));

    setHydrated(true);
  }, [user, loading]);

  useEffect(() => {
    if (!hydrated) return;

    saveCart(cart, user?.id);
  }, [cart, user, hydrated]);

  return null;
}
