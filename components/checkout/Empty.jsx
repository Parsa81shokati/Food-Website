import React from "react";
import { TbShoppingCartSearch } from "react-icons/tb";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/router";

function Empty({ onClose }) {
  const router = useRouter();

  const handleStartShopping = () => {
    if (onClose) onClose(); // بستن مودال
    router.push("/Menu");
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-10 text-center">
      {/* آیکون اصلی با انیمیشن */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#9e0910]/20 rounded-full animate-ping" />
        <div className="relative bg-gradient-to-br from-[#9e0910] to-[#c20e17] p-5 rounded-full text-white shadow-xl">
          <TbShoppingCartSearch className="text-5xl md:text-6xl" />
        </div>

        {/* آیکون کوچک غمگین */}
        <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg animate-bounce">
          <HiOutlineEmojiSad className="text-white text-xl" />
        </div>
      </div>

      {/* متن اصلی با افکت */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 relative">
        Your Cart is Empty!
      </h3>

      <p className="text-sm md:text-base text-gray-500 max-w-[250px] md:max-w-sm mb-6">
        Looks like you haven't added anything to your cart yet. Explore our
        delicious items and start shopping!
      </p>

      {/* خط تزئینی با انیمیشن */}
      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#9e0910] to-transparent mb-4 animate-pulse" />

      {/* دکمه شروع خرید */}
      <button
        onClick={handleStartShopping}
        className="mt-2 group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#9e0910] hover:bg-[#7e0710] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
      >
        <span className="relative z-10">Start Shopping</span>
        <BsArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />

        {/* افکت نور در پس‌زمینه */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </div>
  );
}

export default Empty;
