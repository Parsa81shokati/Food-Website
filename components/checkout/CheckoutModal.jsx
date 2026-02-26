import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import { calculateDiscountPrice } from "@/helper/helper";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

import CheckoutCart from "./CheckoutCart";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import LoginSignUpModal from "../Login/LoginSignUpModal";

function CheckoutModal({
  onOpenCheckout,
  setOnOpenCheckout,
  onOpenLogin,
  setOnopenLogin,
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const modalRef = useRef(null);
  const items = useSelector((state) => state.checkout.selectedItems);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // محاسبه مجموع قیمت‌ها
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const discountedPrice = calculateDiscountPrice(
        item.price,
        item.discountPercentage,
      );
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  // محاسبه مجموع تخفیف
  const calculateTotalDiscount = () => {
    return items.reduce((total, item) => {
      const discountAmount = (item.price * item.discountPercentage) / 100;
      return total + discountAmount * item.quantity;
    }, 0);
  };

  const calculateOriginalTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotal();
  const totalDiscount = calculateTotalDiscount();
  const originalTotal = calculateOriginalTotal();

  const handleCheckout = () => {
    if (!user) {
      setOnopenLogin(true);
      setOnOpenCheckout(false);
      return;
    }

    router.push("/checkout");
  };

  // بستن مودال با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOnOpenCheckout(false);
      }
    };

    if (onOpenCheckout) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOpenCheckout, setOnOpenCheckout]);

  return (
    <div className="relative">
      {onOpenLogin && (
        <LoginSignUpModal onClose={() => setOnopenLogin(false)} />
      )}

      <button
        onClick={() => setOnOpenCheckout(!onOpenCheckout)}
        className="relative p-2.5 hover:bg-gray-100 hover:scale-110 rounded-full transition-all duration-200 group"
        aria-label="Shopping cart"
      >
        <AiOutlineShoppingCart className="text-2xl text-gray-700 group-hover:text-[#9e0910] transition-colors" />

        {/* Badge با انیمیشن */}
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#9e0910] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
            {totalCount}
          </span>
        )}
      </button>

      {onOpenCheckout && (
        <>
          {/* Overlay با افکت محو */}
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setOnOpenCheckout(false)}
          />

          {/* مودال کارت */}
          <div
            ref={modalRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-10 md:left-auto md:right-8 md:translate-x-0 md:translate-y-0 w-[calc(100%-2rem)] md:w-96 max-w-md bg-white rounded-2xl shadow-2xl z-40 overflow-hidden animate-slideDown flex flex-col max-h-[90vh] md:max-h-[85vh]"
          >
            {/* هدر */}
            <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-white text-xl" />
                <h2 className="text-white font-semibold text-lg">
                  Shopping Cart ({totalCount})
                </h2>
              </div>
              <button
                onClick={() => setOnOpenCheckout(false)}
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>

            {/* محتوای اصلی */}
            <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
              {items.length === 0 ? (
                <Empty onClose={setOnOpenCheckout} />
              ) : (
                <div className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <CheckoutCart key={item.id || index} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* فوتر با خلاصه خرید */}
            {items.length > 0 && (
              <div className="bg-gray-50 px-6 py-2.5 border-t border-gray-200 space-y-3">
                {/* خلاصه قیمت‌ها */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Original Price:</span>
                    <span className="text-gray-500 line-through">
                      ${originalTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Discount:</span>
                    <span className="text-green-600 font-medium">
                      -${totalDiscount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Total:</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#9e0910]">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* اطلاعات ارسال */}
                {/* <div className="flex items-center gap-2 text-xs text-gray-500 bg-blue-50 p-1 rounded-lg">
                  <BsTruck className="text-blue-500 flex-shrink-0" />
                  <span>Free shipping on orders over $100</span>
                </div> */}

                {/* دکمه ادامه */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#9e0910] hover:bg-[#7e0710] text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  <span>Continue to Checkout</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                {/* لینک ادامه خرید */}
                <button
                  onClick={() => setOnOpenCheckout(false)}
                  className="w-full text-sm text-gray-500 hover:text-[#9e0910] transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* استایل‌های اضافی برای انیمیشن */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @media (min-width: 768px) {
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

export default CheckoutModal;
