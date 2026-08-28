export const loadCart = (userId) => {
  if (typeof window === "undefined") return [];

  const key = userId ? `cart_${userId}` : "cart_guest";

  try {
    const saved = localStorage.getItem(key);

    if (!saved) return [];

    const data = JSON.parse(saved);

    // اگر تاریخ گذشته باشد
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem(key);

      return [];
    }

    return data.items || [];
  } catch {
    return [];
  }
};

export const saveCart = (cart, userId) => {
  if (typeof window === "undefined") return;

  const key = userId ? `cart_${userId}` : "cart_guest";

  const data = {
    items: cart,

    // یک روز بعد
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  };

  localStorage.setItem(key, JSON.stringify(data));
};

export const clearCart = (userId) => {
  if (typeof window === "undefined") return;

  const key = userId ? `cart_${userId}` : "cart_guest";

  localStorage.removeItem(key);
};
