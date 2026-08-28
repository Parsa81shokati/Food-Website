export const loadCheckout = () => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem("checkout");

    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveCheckout = (formData) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("checkout", JSON.stringify(formData));
};

export const clearCheckout = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("checkout");
};
