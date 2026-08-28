import React from "react";

import {
  FaCreditCard,
  FaMoneyBillWave,
  FaCheckCircle,
  FaArrowLeft,
  FaLock,
  FaShieldAlt,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

function PaymentModal({
  showModal,
  paymentStatus,
  closeModal,
  statusMessage,
  progress,
}) {
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fadeInUp">
            {/* دکمه بستن (فقط در حالت‌های success/failed قابل استفاده است) */}
            {/* {paymentStatus !== "processing" && (
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes className="text-xl" />
              </button>
            )} */}

            <div className="text-center">
              {/* آیکون وضعیت */}
              {paymentStatus === "processing" && (
                <div className="flex justify-center mb-4">
                  <FaSpinner className="text-5xl text-[#9e0910] animate-spin" />
                </div>
              )}
              {paymentStatus === "success" && (
                <div className="flex justify-center mb-4">
                  <FaCheckCircle className="text-6xl text-green-500" />
                </div>
              )}
              {paymentStatus === "failed" && (
                <div className="flex justify-center mb-4">
                  <FaTimes className="text-6xl text-red-500" />
                </div>
              )}

              {/* عنوان */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {paymentStatus === "processing" && "Processing Payment"}
                {paymentStatus === "success" && "Payment Successful!"}
                {paymentStatus === "failed" && "Payment Failed"}
              </h3>

              {/* پیام وضعیت */}
              <p className="text-gray-600 mb-4">{statusMessage}</p>

              {/* نوار پیشرفت (فقط در حالت پردازش) */}
              {paymentStatus === "processing" && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm font-mono text-gray-600">
                    {Math.round(progress)}%
                  </p>
                </div>
              )}

              {/* دکمه‌های اقدام در حالت موفقیت/خطا */}
              {paymentStatus === "success" && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={closeModal}
                    className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
                  >
                    Redirecting to your order...
                  </button>
                </div>
              )}

              {paymentStatus === "failed" && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => {
                      closeModal();
                      // می‌توانید دوباره تلاش کنید
                    }}
                    className="w-full bg-[#9e0910] text-white py-3 rounded-xl font-medium hover:bg-[#7e0710] transition"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-full text-gray-500 text-sm hover:text-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentModal;
