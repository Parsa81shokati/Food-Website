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
import { BsCreditCard, BsCashStack } from "react-icons/bs";
import { useRouter } from "next/router";

function Payment({ amount, paymentMethod, setPaymentMethod, handlePayment }) {
  const router = useRouter();
  return (
    <div>
      {" "}
      {/* کارت اصلی */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* خلاصه سفارش */}
        <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Amount</p>
              <p className="text-3xl font-bold">${amount}</p>
            </div>
          </div>
        </div>

        {/* محتوای پرداخت */}
        <div className="p-6 md:p-8 space-y-6">
          {/* انتخاب روش پرداخت */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BsCreditCard /> Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* کارت بانکی */}
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === "card"
                    ? "border-[#9e0910] bg-[#9e0910]/5 shadow-md"
                    : "border-gray-200 hover:border-[#9e0910]/50 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`p-3 rounded-full ${paymentMethod === "card" ? "bg-[#9e0910] text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  <FaCreditCard className="text-xl" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Card Payment</p>
                  <p className="text-xs text-gray-500">
                    Pay with credit/debit card
                  </p>
                </div>
                {paymentMethod === "card" && (
                  <FaCheckCircle className="text-[#9e0910] ml-auto text-xl" />
                )}
              </button>

              {/* پرداخت در محل */}
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === "cod"
                    ? "border-[#9e0910] bg-[#9e0910]/5 shadow-md"
                    : "border-gray-200 hover:border-[#9e0910]/50 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`p-3 rounded-full ${paymentMethod === "cod" ? "bg-[#9e0910] text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  <FaMoneyBillWave className="text-xl" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-xs text-gray-500">Pay when you receive</p>
                </div>
                {paymentMethod === "cod" && (
                  <FaCheckCircle className="text-[#9e0910] ml-auto text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* توضیحات روش پرداخت */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            {paymentMethod === "card" ? (
              <div className="flex items-start gap-3">
                <FaLock className="text-[#9e0910] mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Secure Card Payment
                  </p>
                  <p className="text-xs text-gray-500">
                    Your card information is encrypted and secure. We accept
                    Visa, Mastercard, and more.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <BsCashStack className="text-[#9e0910] mt-1 text-xl" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-xs text-gray-500">
                    Pay with cash when your order arrives. No additional fees.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* دکمه‌های پرداخت */}
          <div className="space-y-3 pt-2">
            {paymentMethod === "card" ? (
              <button
                onClick={() => handlePayment("card")}
                className="w-full bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white py-4 rounded-xl font-medium hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaCreditCard /> Pay ${amount} with Card
              </button>
            ) : (
              <button
                onClick={() => handlePayment("cod")}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-medium hover:bg-green-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaMoneyBillWave /> Pay ${amount} on Delivery
              </button>
            )}

            <button
              onClick={() => router.back()}
              className="w-full text-gray-500 text-sm hover:text-gray-700 transition py-2 flex items-center justify-center gap-1"
            >
              <FaArrowLeft /> Go Back
            </button>
          </div>

          {/* امنیت */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 border-t pt-4">
            <FaShieldAlt className="text-[#9e0910]" />
            <span>All transactions are secure and encrypted</span>
            <FaLock className="text-gray-400" />
          </div>
        </div>
      </div>
      {/* یادآوری demo */}
      <div className="text-center mt-6 text-xs text-gray-400 border-t border-gray-200 pt-4">
        <p>
          🔒 This is a demo payment page. No real transactions are processed.
        </p>
      </div>
    </div>
  );
}

export default Payment;
