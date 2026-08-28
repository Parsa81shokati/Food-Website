import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Payment from "@/features/checkout/components/payment/Payment";
import PaymentModal from "@/features/checkout/components/payment/PaymentModal";
import { FaCreditCard } from "react-icons/fa";
import RequireAuth from "@/components/auth/RequireAuth";
import { useDispatch } from "react-redux";
import { clearCart } from "@/features/cart/cartSlice.js.jsx";
import { resetCheckoutData } from "@/features/checkout/checkoutSlice";

function PaymentDemo() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("processing"); // 'processing', 'success', 'failed'
  const [statusMessage, setStatusMessage] = useState("");

  const dispatch = useDispatch();

  const intervalRef = useRef(null);

  const router = useRouter();
  const { total, orderId } = router.query;
  const amount = Number(total ?? 0);

  const handleSuccess = async () => {
    try {
      const res = await fetch("/api/checkout/pay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment update failed");
      }

      dispatch(clearCart());
      dispatch(resetCheckoutData());

      setPaymentStatus("success");
      setStatusMessage("✅ Payment successful!");
    } catch (err) {
      console.error(err);
      setPaymentStatus("failed");
      setStatusMessage("❌ Payment update failed");
    }
  };

  // شروع فرآیند پرداخت با نمایش مودال
  const handlePayment = (method) => {
    setPaymentMethod(method);
    setShowModal(true);
    setProgress(0);
    setPaymentStatus("processing");
    setStatusMessage("🍔 Preparing your order...");

    if (!orderId) {
      alert("Order not found");
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let currentProgress = 0;

    intervalRef.current = setInterval(async () => {
      currentProgress += Math.random() * 12 + 3;
      currentProgress = Math.min(currentProgress, 100);

      setProgress(currentProgress);

      if (currentProgress < 30) {
        setStatusMessage("🍔 Preparing your order...");
      } else if (currentProgress < 60) {
        setStatusMessage("🔒 Verifying payment details...");
      } else if (currentProgress < 90) {
        setStatusMessage("⏳ Confirming with bank...");
      } else {
        setStatusMessage("✨ Almost done...");
      }

      if (currentProgress >= 100) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        const success = Math.random() < 0.9;

        if (success) {
          await handleSuccess();
        } else {
          setPaymentStatus("failed");
          setStatusMessage("❌ Payment failed. Please try again.");
        }
      }
    }, 300);
  };

  // بستن مودال و ریست
  const closeModal = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setShowModal(false);
    setProgress(0);
    setPaymentStatus("processing");
    setStatusMessage("");
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (paymentStatus !== "success") return;

    const timeout = setTimeout(() => {
      router.replace(`/orders/${orderId}`);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [paymentStatus]);

  useEffect(() => {
    if (paymentStatus !== "failed") return;

    const timeout = setTimeout(() => {
      router.replace("/checkout");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [paymentStatus]);

  console.log("ORDER ID:", orderId);

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-14 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* هدر */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#9e0910]/10 px-4 py-2 rounded-full mb-4">
              <FaCreditCard className="text-[#9e0910]" />
              <span className="text-sm font-medium text-[#9e0910]">
                Secure Payment
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Complete Your <span className="text-[#9e0910]">Payment</span>
            </h1>
            {/* <p className="text-gray-500 mt-2">Order #{orderData.orderNumber}</p> */}
          </div>
          <Payment
            amount={amount}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            handlePayment={handlePayment}
          />
        </div>

        {/* =============== مودال پردازش پرداخت =============== */}
        <PaymentModal
          showModal={showModal}
          paymentStatus={paymentStatus}
          closeModal={closeModal}
          statusMessage={statusMessage}
          progress={progress}
        />
      </div>
    </RequireAuth>
  );
}

PaymentDemo.getLayout = function getLayout(page) {
  return <>{page}</>; // برگرداندن صفحه بدون هیچ لایوتی
};
export default PaymentDemo;
