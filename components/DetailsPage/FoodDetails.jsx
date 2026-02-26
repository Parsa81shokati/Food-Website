import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { MdShoppingCart, MdLocalOffer } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

function FoodDetails({ food }) {
  const [quantity, setQuantity] = useState(1);
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

  const cartItem = items.find((i) => i.id === food.id);

  // محاسبه ستاره‌ها
  const rating = food.rating || 4.7;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // محاسبه قیمت با تخفیف
  const discountedPrice = food.isDiscounted
    ? (food.price * (1 - food.discountPercentage / 100)).toFixed(2)
    : food.price;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addItem(food));
    }
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-[#9e0910]/10 hover:border-[#9e0910]/30 transition-all duration-300">
      {/* بخش بالایی با دو ستون */}
      <div className="flex flex-col md:flex-row">
        {/* ستون تصویر */}
        <div className="md:w-1/2 relative bg-gradient-to-br from-[#9e0910]/5 to-[#c20e17]/5 p-6 flex items-center justify-center">
          {/* پس‌زمینه تزئینی */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 bg-[#9e0910] rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#c20e17] rounded-full blur-3xl" />
          </div>

          {/* تصویر */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 z-10">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-xl" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src={food.image.url}
                alt={food.title}
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* برچسب تخفیف */}
          {food.isDiscounted && (
            <div className="absolute top-4 right-4 z-20">
              <div className="relative">
                <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white text-sm font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-1">
                  <BsFire className="animate-pulse" />
                  {food.discountPercentage}% OFF
                </div>
                <div className="absolute inset-0 bg-[#9e0910] rounded-full blur-md opacity-50" />
              </div>
            </div>
          )}
        </div>

        {/* ستون اطلاعات */}
        <div className="md:w-1/2 p-6 md:p-8">
          {/* دسته‌بندی */}
          {food.category && (
            <div className="inline-block bg-[#9e0910]/10 px-3 py-1 rounded-full text-xs text-[#9e0910] font-medium mb-3">
              {food.category.name}
            </div>
          )}

          {/* عنوان */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            {food.title}
          </h1>

          {/* ستاره‌ها */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => {
                if (i < fullStars) {
                  return (
                    <FaStar
                      key={i}
                      className="text-yellow-400 text-sm md:text-base"
                    />
                  );
                } else if (hasHalfStar && i === fullStars) {
                  return (
                    <FaStarHalfAlt
                      key={i}
                      className="text-yellow-400 text-sm md:text-base"
                    />
                  );
                } else {
                  return (
                    <FaRegStar
                      key={i}
                      className="text-gray-300 text-sm md:text-base"
                    />
                  );
                }
              })}
            </div>
            <span className="text-sm text-gray-500">({rating} / 5)</span>
          </div>

          {/* توضیحات */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
            {food.description}
          </p>

          {/* ویژگی‌ها */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-[#9e0910] rounded-full" />
              <span>Fresh Ingredients</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-[#9e0910] rounded-full" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-[#9e0910] rounded-full" />
              <span>Best Quality</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-[#9e0910] rounded-full" />
              <span>Halal Food</span>
            </div>
          </div>

          {/* قیمت و دکمه خرید */}
          <div className="border-t border-gray-100 pt-6">
            {/* قیمت */}
            <div className="flex items-baseline gap-3 mb-4">
              {food.isDiscounted ? (
                <>
                  <span className="text-3xl md:text-4xl font-bold text-[#9e0910]">
                    ${discountedPrice}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${food.price}
                  </span>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Save ${(food.price - discountedPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-3xl md:text-4xl font-bold text-gray-800">
                  ${food.price}
                </span>
              )}
            </div>

            {/* انتخاب تعداد */}
            {!cartItem ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center border border-gray-200 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-full transition"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-full transition"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white py-3 rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <MdShoppingCart className="text-lg" />
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white rounded-full p-1">
                <button
                  onClick={() => dispatch(removeItem(food))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition"
                >
                  <FaMinus />
                </button>
                <span className="font-bold text-lg">{cartItem.quantity}</span>
                <button
                  onClick={() => dispatch(addItem(food))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition"
                >
                  <FaPlus />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
