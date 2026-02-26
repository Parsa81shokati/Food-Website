import React, { useState } from "react";
import Image from "next/image";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { MdAdd, MdRemove, MdShoppingCart } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { calculateDiscountPrice } from "@/helper/helper";
import { addItem } from "@/redux-toolkit/features/CheckoutSlice";

function DiscountCard({ food }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

  const cartItem = items.find((i) => i.id === food.id);

  // محاسبه قیمت با تخفیف
  const discountedPrice = calculateDiscountPrice(
    food.price,
    food.discountPercentage,
  );

  // محاسبه ستاره‌ها (فرضی)
  const rating = food.rating || 4.5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div
      className="relative group mt-10 md:mt-15"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* کارت اصلی - با ارتفاع ثابت */}
      <div className="relative flex flex-col items-center h-52 md:h-64 w-40 md:w-52 bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#9e0910]/30">
        {/* پس‌زمینه گرادیانت هنگام هاور */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#9e0910]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* برچسب تخفیف */}
        {food.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 z-20">
            <div className="relative">
              <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {food.discountPercentage}% OFF
              </div>
              <div className="absolute inset-0 bg-[#9e0910] rounded-full blur-md opacity-50" />
            </div>
          </div>
        )}

        {/* برچسب ویژه */}
        {food.isSpecial && (
          <div className="absolute top-2 left-2 z-20">
            <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <BsLightningCharge className="text-sm" />
              Special
            </div>
          </div>
        )}

        {/* بخش تصویر */}
        <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 w-20 h-20 md:w-28 md:h-28">
          {/* دایره بیرونی */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-[#9e0910] to-[#c20e17] rounded-full transition-all duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
          />

          {/* دایره داخلی برای تصویر */}
          <div className="absolute inset-1 bg-white rounded-full overflow-hidden border-2 border-white shadow-xl">
            {!imageError ? (
              <Image
                src={food.image?.url || food.image}
                alt={food.title}
                width={200}
                height={150}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-400">🍽️</span>
              </div>
            )}
          </div>

          {/* افکت نور دور تصویر */}
          <div
            className={`absolute -inset-2 bg-[#9e0910]/20 rounded-full blur-xl transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* محتوای کارت - با ساختار flex column */}
        <div className="flex flex-col items-center w-full h-full mt-14 md:mt-20 px-2 md:px-3">
          {/* بخش بالایی - فضای ثابت برای ستاره‌ها و عنوان */}
          <div className="flex flex-col items-center w-full flex-1">
            {/* ستاره‌ها - ارتفاع ثابت */}
            <div className="flex items-center gap-0.5 mb-1 md:mb-2 h-4 md:h-5">
              {[...Array(5)].map((_, i) => {
                if (i < fullStars) {
                  return (
                    <FaStar
                      key={i}
                      className="text-yellow-400 text-xs md:text-sm"
                    />
                  );
                } else if (hasHalfStar && i === fullStars) {
                  return (
                    <FaStarHalfAlt
                      key={i}
                      className="text-yellow-400 text-xs md:text-sm"
                    />
                  );
                } else {
                  return (
                    <FaRegStar
                      key={i}
                      className="text-gray-300 text-xs md:text-sm"
                    />
                  );
                }
              })}
              <span className="text-[10px] md:text-xs text-gray-500 ml-1">
                ({rating})
              </span>
            </div>

            {/* عنوان - ارتفاع ثابت برای ۲ خط */}
            <div className="h-8 md:h-10 mb-1 overflow-hidden px-1">
              <h3 className="text-xs md:text-sm font-bold text-gray-800 text-center line-clamp-2">
                {food.title}
              </h3>
            </div>

            {/* توضیحات - ارتفاع ثابت برای ۲ خط (فقط در دسکتاپ) */}
            {food.description ? (
              <div className="h-8 md:h-10 mb-2 overflow-hidden ">
                <p className="text-[10px] md:text-xs text-gray-500 text-center line-clamp-2">
                  {food.description}
                </p>
              </div>
            ) : (
              /* فضای خالی وقتی توضیحات نداریم - برای ثابت ماندن موقعیت دکمه */
              <div className="h-8 md:h-10 mb-2 hidden md:block" />
            )}
          </div>

          {/* بخش پایینی - دکمه و قیمت با mt-auto */}
          <div className="flex items-center justify-between w-full pb-3 md:pb-4 px-1">
            {/* قیمت‌ها */}
            <div className="flex flex-col">
              {food.discountPercentage > 0 ? (
                <>
                  <span className="text-[10px] md:text-xs text-gray-400 line-through">
                    ${food.price}
                  </span>
                  <span className="text-sm md:text-base font-bold text-[#9e0910]">
                    ${discountedPrice}
                  </span>
                </>
              ) : (
                <span className="text-sm md:text-base font-bold text-gray-800">
                  ${food.price}
                </span>
              )}
            </div>

            {/* دکمه‌های کنترل */}
            {!cartItem ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addItem(food));
                }}
                className="relative group/btn overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#9e0910] to-[#c20e17] rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-1 md:gap-2 bg-[#9e0910] text-white text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-full hover:shadow-lg transition-all duration-300 group-hover/btn:scale-105">
                  <MdShoppingCart className="text-sm md:text-base" />
                  <span className="hidden md:inline">Add</span>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white rounded-full px-1 md:px-2 py-1 shadow-lg">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeItem(food));
                  }}
                  className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center hover:bg-white/20 rounded-full transition-all text-lg md:text-xl font-bold"
                >
                  <MdRemove />
                </button>
                <span className="text-xs md:text-sm font-bold min-w-[20px] text-center">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addItem(food));
                  }}
                  className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center hover:bg-white/20 rounded-full transition-all text-lg md:text-xl font-bold"
                >
                  <MdAdd />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* افکت خط زیرین */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9e0910] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>

      {/* نشانگر موجودی */}
      {food.stock && food.stock < 10 && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg">
          Only {food.stock} left
        </div>
      )}

      {/* استایل‌های سفارشی */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}

export default DiscountCard;
