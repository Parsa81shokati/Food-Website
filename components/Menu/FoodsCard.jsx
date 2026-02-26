import React, { useState } from "react";
import Image from "next/image";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { MdAdd, MdRemove, MdShoppingCart } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";
import { calculateDiscountPrice } from "@/helper/helper";

function FoodsCard({ food }) {
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

  // محاسبه ستاره‌ها
  const rating = food.rating || 4.5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div
      className="relative group mt-12 md:mt-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* کارت اصلی */}
      <div className="relative flex flex-col items-center h-64 md:h-72 w-44 md:w-56 bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#9e0910]/30 pt-14 md:pt-16">
        {/* پس‌زمینه گرادیانت هنگام هاور */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#9e0910]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* برچسب تخفیف */}
        {food.isDiscounted && (
          <div className="absolute -top-2 -right-2 z-20">
            <div className="relative">
              <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white text-xs font-bold px-3 py-2 rounded-full shadow-[0_0_20px_rgba(158,9,16,0.5)] flex flex-col items-center leading-tight">
                <span className="text-sm">{food.discountPercentage}%</span>
                <span className="text-[8px]">OFF</span>
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
        <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2">
          {/* دایره بیرونی */}
          <div
            className={`w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#9e0910] to-[#c20e17] transition-all duration-300 ${isHovered ? "scale-105" : "scale-100"} flex items-center justify-center shadow-xl`}
          >
            {/* دایره داخلی برای تصویر */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white overflow-hidden border-2 border-white shadow-inner">
              {!imageError ? (
                <div className="relative w-full h-full">
                  <Image
                    src={food.image?.url || food.image}
                    alt={food.title}
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl text-gray-400">🍽️</span>
                </div>
              )}
            </div>
          </div>

          {/* افکت نور دور تصویر */}
          <div
            className={`absolute -inset-3 bg-[#9e0910]/20 rounded-full blur-xl transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* محتوای کارت */}
        <div className="flex flex-col items-center w-full h-full px-2 md:px-3 mt-6">
          {/* عنوان */}
          <h3 className="text-sm md:text-base font-bold text-gray-800 text-center line-clamp-1 mb-2 px-2">
            {food.title}
          </h3>

          {/* ستاره‌ها */}
          <div className="flex items-center gap-0.5 mb-2">
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
          </div>

          {/* توضیحات */}
          <div className="flex-1 w-full mb-2 overflow-hidden">
            <p className="text-xs md:text-sm text-gray-500 text-center line-clamp-2 px-2">
              {food.description ||
                "Delicious food prepared with fresh ingredients"}
            </p>
          </div>

          {/* بخش قیمت و دکمه */}
          <div className="flex items-center justify-between w-full pb-3 md:pb-4 px-2 border-t border-gray-100 pt-2">
            {/* قیمت‌ها */}
            <div className="flex flex-col">
              {food.isDiscounted ? (
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
                <div className="relative flex items-center gap-1 bg-[#9e0910] text-white text-xs md:text-sm px-3 py-1.5 rounded-full hover:shadow-lg transition-all duration-300 group-hover/btn:scale-105">
                  <MdShoppingCart className="text-sm md:text-base" />
                  <span>Add</span>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white rounded-full px-2 py-1 shadow-lg">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeItem(food));
                  }}
                  className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-all text-lg font-bold"
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
                  className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-all text-lg font-bold"
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
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg z-10">
          Only {food.stock} left
        </div>
      )}
    </div>
  );
}

export default FoodsCard;
