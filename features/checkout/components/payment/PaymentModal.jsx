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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl animate-fadeInUp">
            <div className="text-center">
              {/* ================= PROCESSING ================= */}
              {paymentStatus === "processing" && (
                <>
                  {/* Animated Icon */}
                  <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[#9e0910]/10 animate-ping" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#9e0910]/10">
                      <FaCreditCard className="text-3xl text-[#9e0910]" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-gray-800">
                    Processing Payment
                  </h3>

                  <p className="mb-6 text-sm leading-6 text-gray-500">
                    {statusMessage}
                  </p>

                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#9e0910] to-[#c20e17] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Please wait...</span>

                      <span className="font-semibold text-[#9e0910]">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="mt-7 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <FaLock />
                    <span>Your payment is being processed securely</span>
                  </div>
                </>
              )}

              {/* ================= SUCCESS ================= */}
              {paymentStatus === "success" && (
                <>
                  {/* Success Icon */}
                  <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-green-100 animate-pulse" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                      <FaCheckCircle className="text-6xl text-green-500" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-gray-800">
                    Payment Successful!
                  </h3>

                  <p className="mx-auto max-w-xs text-sm leading-6 text-gray-500">
                    {statusMessage}
                  </p>

                  {/* Redirecting Status */}
                  <div className="mt-7 rounded-2xl bg-gray-50 px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <FaSpinner className="animate-spin text-[#9e0910]" />

                      <span className="text-sm font-medium text-gray-600">
                        Redirecting to your order
                      </span>

                      <span className="flex gap-1">
                        <span className="h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                      </span>
                    </div>
                  </div>

                  {/* Secure Payment */}
                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <FaShieldAlt />
                    <span>Payment completed securely</span>
                  </div>
                </>
              )}

              {/* ================= FAILED ================= */}
              {paymentStatus === "failed" && (
                <>
                  {/* Error Icon */}
                  <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-red-100 animate-pulse" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                      <FaTimes className="text-5xl text-red-500" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-gray-800">
                    Payment Failed
                  </h3>

                  <p className="mx-auto max-w-xs text-sm leading-6 text-gray-500">
                    {statusMessage}
                  </p>

                  {/* Try Again */}
                  <div className="mt-7 space-y-3">
                    <button
                      onClick={() => {
                        closeModal();
                        // می‌توانید دوباره تلاش کنید
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9e0910] py-3.5 font-medium text-white shadow-lg shadow-[#9e0910]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7e0710] hover:shadow-xl"
                    >
                      <span>Try Again</span>
                      <FaArrowLeft className="text-sm" />
                    </button>

                    <button
                      onClick={closeModal}
                      className="w-full rounded-xl py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentModal;
