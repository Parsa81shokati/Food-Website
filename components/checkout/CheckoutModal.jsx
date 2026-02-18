import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import { calculateDiscountPrice } from "@/helper/helper";
import Link from "next/link";

function CheckoutModal({ setOnOpenCheckout }) {
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

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

  const totalPrice = calculateTotal();
  const totalDiscount = calculateTotalDiscount();

  return (
    <div>
      {/* <div
        className="fixed inset-0 z-40"
        onClick={() => setOnOpenCheckout(false)}
      /> */}
      <div className="bg-gray-50 w-55 md:w-96 max-h-[80vh] rounded-t-2xl shadow-2xl overflow-y-auto px-4">
        {items.length === 0 ? (
          <Empty />
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-gray-200 p-3 items-center"
            >
              <div className="flex flex-col flex-1">
                <h3 className="font-medium text-sm line-clamp-1">
                  {item.title}
                </h3>
                {item.discountPercentage > 0 ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 line-through">
                      ${item.price}
                    </span>
                    <span className="text-sm font-bold text-[#9e0910]">
                      $
                      {calculateDiscountPrice(
                        item.price,
                        item.discountPercentage,
                      )}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-700 mt-1">
                    ${item.price}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(removeItem(item))}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#9e0910] hover:text-white transition"
                >
                  -
                </button>

                <span className="text-sm font-semibold w-6 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => dispatch(addItem(item))}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#9e0910] hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {items.length > 0 && (
        <div className="bg-red-50 px-6 py-2 rounded-b-2xl border-t border-red-800 space-y-1">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Discount</span>
            <span className="font-medium">-${totalDiscount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Total</span>
            <span className=" text-gray-700 font-bold ">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <Link href="/checkout">
            <button
              onClick={() => setOnOpenCheckout(false)}
              className="w-full mt-2 bg-[#9e0910] hover:bg-[#7e0710] text-white py-3 rounded-xl font-medium transition"
            >
              Continue to Checkout →
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CheckoutModal;
