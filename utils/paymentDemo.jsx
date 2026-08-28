export function startDemoPayment(
  method,
  setPaymentMethod,
  setShowModal,
  setProgress,
  setPaymentStatus,
  setStatusMessage,
) {
  setPaymentMethod(method);
  setShowModal(true);
  setProgress(0);
  setPaymentStatus("processing");
  setStatusMessage("Preparing your order...");

  let currentProgress = 0;
  const interval = setInterval(() => {
    currentProgress += Math.random() * 12 + 3; // افزایش تصادفی
    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(interval);

      // شبیه‌سازی نتیجه (۹۰٪ موفقیت)
      const isSuccess = Math.random() < 0.9;
      if (isSuccess) {
        setPaymentStatus("success");
        setStatusMessage("✅ Payment successful! Your order is confirmed.");
      } else {
        setPaymentStatus("failed");
        setStatusMessage("❌ Payment failed. Please try again.");
      }
    }
    setProgress(Math.min(currentProgress, 100));
    // به‌روزرسانی پیام بر اساس پیشرفت
    if (currentProgress < 30) {
      setStatusMessage("🍔 Preparing your order...");
    } else if (currentProgress < 60) {
      setStatusMessage("🔒 Verifying payment details...");
    } else if (currentProgress < 90) {
      setStatusMessage("⏳ Confirming with bank...");
    } else if (currentProgress < 100) {
      setStatusMessage("✨ Almost done...");
    }
  }, 300);

  // پاک کردن interval در صورت unmount
  return () => clearInterval(interval);
}

// بستن مودال و ریست
const closeModal = () => {
  setShowModal(false);
  setProgress(0);
  setPaymentStatus("processing");
};
