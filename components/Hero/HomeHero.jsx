import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaStar, FaTruck, FaLeaf, FaFire } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";

function HomeHero() {
  const imageRef = useRef(null);

  useEffect(() => {
    // انیمیشن ساده برای تصویر
    const interval = setInterval(() => {
      if (imageRef.current) {
        imageRef.current.style.transform = "translateY(-5px)";
        setTimeout(() => {
          if (imageRef.current) {
            imageRef.current.style.transform = "translateY(0px)";
          }
        }, 1500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-red-50/30 to-orange-50/20 overflow-hidden">
      {/* الگوهای پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#9e0910]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* محتوای اصلی */}
      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 pt-24 ">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* بخش چپ - متن */}
          <div className="flex-1 text-center md:text-left animate-slideUp">
            {/* برچسب */}
            <div className="inline-flex items-center gap-2 bg-[#9e0910]/10 px-4 py-2 rounded-full mb-6">
              <FaFire className="text-[#9e0910] animate-pulse" />
              <span className="text-sm font-medium text-[#9e0910]">
                Hot & Fresh Daily
              </span>
            </div>

            {/* عنوان اصلی */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Delicious
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-[#9e0910] font-extrabold">
                  Food
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#9e0910]/20 rounded-full -z-10" />
              </span>
              <br />
              is waiting for you
            </h1>

            {/* متن توضیحات */}
            <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
              From comforting classics to exciting new flavors, we bring the
              taste you love closer than ever. Your next favorite dish is just a
              click away.
            </p>

            {/* ویژگی‌ها */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-xl mx-auto md:mx-0">
              <div className="flex items-center gap-2 text-gray-600">
                <FaStar className="text-yellow-500" />
                <span className="text-xs md:text-sm">4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaTruck className="text-[#9e0910]" />
                <span className="text-xs md:text-sm">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaLeaf className="text-green-500" />
                <span className="text-xs md:text-sm">Fresh Ingredients</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BsClockHistory className="text-blue-500" />
                <span className="text-xs md:text-sm">30 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <IoFastFoodOutline className="text-orange-500" />
                <span className="text-xs md:text-sm">50+ Dishes</span>
              </div>
            </div>

            {/* دکمه‌ها */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link
                href="/Menu"
                className="group relative px-8 py-3 bg-[#9e0910] text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Menu
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#7f070d] to-[#9e0910] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/#reservation"
                className="group px-8 py-3 border-2 border-[#9e0910] text-[#9e0910] rounded-full font-semibold hover:bg-[#9e0910] hover:text-white transition-all duration-300 hover:shadow-lg"
              >
                Book a Table
              </Link>
            </div>

            {/* آمار */}
            <div className="flex items-center gap-8 mt-12 justify-center md:justify-start">
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-bold text-[#9e0910]">
                  50+
                </span>
                <span className="text-xs md:text-sm text-gray-500">Dishes</span>
              </div>
              <div className="w-px h-10 bg-gray-300" />
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-bold text-[#9e0910]">
                  10k+
                </span>
                <span className="text-xs md:text-sm text-gray-500">
                  Happy Clients
                </span>
              </div>
              <div className="w-px h-10 bg-gray-300" />
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-bold text-[#9e0910]">
                  24/7
                </span>
                <span className="text-xs md:text-sm text-gray-500">
                  Service
                </span>
              </div>
            </div>
          </div>

          {/* بخش راست - تصویر */}
          <div className="flex-1 relative">
            {/* افکت‌های دور تصویر */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#9e0910]/20 to-transparent rounded-full blur-3xl -z-10" />

            {/* تصویر اصلی */}
            <div
              ref={imageRef}
              className="relative transition-transform duration-3000 ease-in-out"
            >
              <Image
                src="/fishy.png"
                alt="Delicious Fish Dish"
                width={600}
                height={500}
                priority
                className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />

              {/* برچسب‌های روی تصویر */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl animate-bounce">
                <div className="bg-[#9e0910] rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">-20%</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold">4.9</span>
                </div>
              </div>

              {/* برچسب مواد تازه */}
              <div className="absolute top-1/2 -right-8 bg-white rounded-full p-2 shadow-lg animate-pulse">
                <FaLeaf className="text-green-500 text-xl" />
              </div>
            </div>

            {/* المان‌های شناور */}
            <div className="absolute -top-10 left-10 w-16 h-16 bg-orange-200 rounded-full opacity-50 blur-xl animate-float" />
            <div className="absolute -bottom-10 right-10 w-20 h-20 bg-red-200 rounded-full opacity-50 blur-xl animate-float-delayed" />
          </div>
        </div>
      </div>

      {/* استایل‌های انیمیشن */}
      {/* <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
        }

        .transition-transform {
          transition: transform 0.3s ease;
        }
      `}</style> */}
    </div>
  );
}

export default HomeHero;
