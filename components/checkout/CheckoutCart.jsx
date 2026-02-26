import { calculateDiscountPrice } from "@/helper/helper";
import {
  addItem,
  deleteItem,
  removeItem,
} from "@/redux-toolkit/features/CheckoutSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineDiscount } from "react-icons/md";

function CheckoutCart({ item }) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice = calculateDiscountPrice(
    item.price,
    item.discountPercentage,
  );

  const handleRemove = () => {
    dispatch(removeItem(item));
  };

  const handleAdd = () => {
    dispatch(addItem(item));
  };

  const handleRemoveAll = () => {
    // حذف کامل آیتم با ست کردن quantity به صفر
    dispatch(deleteItem({ ...item, quantity: item.quantity }));
  };

  const discountAmount =
    item.discountPercentage > 0
      ? ((item.price * item.discountPercentage) / 100).toFixed(2)
      : 0;

  return (
    <div
      className="group relative flex gap-3 mt-1 p-4 border-b border-gray-100 hover:bg-red-50/30 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* نشانگر تخفیف - اگر تخفیف دارد */}
      {item.discountPercentage > 0 && (
        <div className="absolute top-0 right-0 bg-[#9e0910] text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-bold shadow-sm flex items-center gap-1">
          <MdOutlineDiscount className="text-xs" />
          {item.discountPercentage}%
        </div>
      )}

      {/* تصویر محصول (اگر وجود داشته باشد) */}
      {item.thumbnail && (
        <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* اطلاعات محصول */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1 group-hover:text-[#9e0910] transition-colors">
          {item.title}
        </h3>

        {/* قیمت‌ها */}
        <div className="space-y-1">
          {item.discountPercentage > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 line-through">
                  ${item.price}
                </span>
                <span className="text-xs text-green-600 font-medium">
                  Save ${discountAmount}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-[#9e0910]">
                  ${discountedPrice}
                </span>
                <span className="text-xs text-gray-500">each</span>
              </div>
            </>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-gray-800">
                ${item.price}
              </span>
              <span className="text-xs text-gray-500">each</span>
            </div>
          )}
        </div>

        {/* جمع کل برای این محصول */}
        <div className="mt-2 text-xs text-gray-500">
          Subtotal:
          <span className="font-semibold text-gray-700 ml-1">
            ${(discountedPrice * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* کنترل‌های مقدار */}
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={handleRemove}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-white hover:bg-[#9e0910] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md text-gray-600 font-medium text-lg"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="text-sm font-bold w-8 text-center text-gray-700">
            {item.quantity}
          </span>

          <button
            onClick={handleAdd}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-white hover:bg-[#9e0910] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md text-gray-600 font-medium text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* دکمه حذف کامل */}
        <button
          onClick={handleRemoveAll}
          className={`mt-2 text-xs flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 ${
            isHovered
              ? "text-[#9e0910] bg-red-100"
              : "text-gray-400 hover:text-[#9e0910]"
          }`}
          aria-label="Remove item"
        >
          <FiTrash2 className="text-sm" />
          <span>Remove</span>
        </button>
      </div>

      {/* افکت خط زیرین هنگام هاور */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#9e0910] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </div>
  );
}

export default CheckoutCart;
