import Image from "next/image";
import React, { useState } from "react";
import ReserveTableModal from "./ReserveTableModal";
import { FaCalendarAlt, FaClock, FaUsers, FaPhoneAlt } from "react-icons/fa";
import { BsCalendarCheck, BsArrowRight } from "react-icons/bs";
import { MdOutlineRestaurant } from "react-icons/md";

function TableReservation() {
  const [open, setOpen] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <div
      id="reservation"
      className="py-8 md:py-16 bg-gradient-to-b from-white to-red-50/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* عنوان بخش */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#9e0910]/10 px-4 py-2 rounded-full mb-4">
            <MdOutlineRestaurant className="text-[#9e0910]" />
            <span className="text-sm font-medium text-[#9e0910]">
              Book Your Table
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Ready for a{" "}
            <span className="text-[#9e0910] relative">
              Special Experience
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#9e0910]/20 rounded-full" />
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm md:text-base">
            Book your table in advance and enjoy a seamless dining experience
            with your loved ones
          </p>
        </div>

        {/* کارت اصلی رزرو */}
        <div className="relative max-w-6xl mx-auto">
          {/* پس‌زمینه تزئینی */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#9e0910]/5 to-transparent rounded-3xl -rotate-1" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#9e0910]/5 to-transparent rounded-3xl rotate-1" />

          {/* محتوای اصلی */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* بخش راست - تصویر */}
              <div className="lg:w-1/2 relative overflow-hidden bg-red-50 p-8 lg:p-10 flex items-center justify-center">
                {/* المان‌های تزئینی */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
                </div>

                {/* تصویر اصلی با افکت */}
                <div
                  className="relative group"
                  onMouseEnter={() => setImageHovered(true)}
                  onMouseLeave={() => setImageHovered(false)}
                >
                  {/* دایره‌های تزئینی دور تصویر */}
                  <div
                    className={`absolute -inset-4 bg-white/20 rounded-full blur-2xl transition-all duration-500 ${imageHovered ? "scale-110 opacity-100" : "scale-100 opacity-60"}`}
                  />
                  <div
                    className={`absolute -inset-8 bg-white/10 rounded-full blur-3xl transition-all duration-700 ${imageHovered ? "scale-125 opacity-70" : "scale-100 opacity-40"}`}
                  />

                  {/* تصویر */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                      <Image
                        src="/table.png"
                        alt="Table Reservation"
                        fill
                        sizes="(max-width: 768px) 256px, 384px"
                        className={`object-cover transition-transform duration-700 ${imageHovered ? "scale-110" : "scale-100"}`}
                      />
                    </div>
                  </div>

                  {/* برچسب‌های روی تصویر */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-xl animate-bounce">
                    <BsCalendarCheck className="text-2xl text-[#9e0910]" />
                  </div>
                  <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-xl animate-pulse">
                    <FaClock className="text-2xl text-[#9e0910]" />
                  </div>
                </div>
              </div>

              {/* بخش چپ - فرم و اطلاعات */}
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                  {/* عنوان */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Reserve <span className="text-[#9e0910]">Your Table</span>
                  </h3>

                  {/* توضیحات */}
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Secure your spot in advance and enjoy a seamless dining
                    experience. Whether it's a special occasion or a casual
                    night out, we'll make sure your table is ready.
                  </p>

                  {/* ویژگی‌ها */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                      <div className="w-10 h-10 bg-[#9e0910]/10 rounded-full flex items-center justify-center">
                        <FaCalendarAlt className="text-[#9e0910]" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Date</span>
                        <p className="text-sm font-semibold">Flexible</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                      <div className="w-10 h-10 bg-[#9e0910]/10 rounded-full flex items-center justify-center">
                        <FaClock className="text-[#9e0910]" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Time</span>
                        <p className="text-sm font-semibold">Any Time</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                      <div className="w-10 h-10 bg-[#9e0910]/10 rounded-full flex items-center justify-center">
                        <FaUsers className="text-[#9e0910]" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Guests</span>
                        <p className="text-sm font-semibold">1-10 People</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                      <div className="w-10 h-10 bg-[#9e0910]/10 rounded-full flex items-center justify-center">
                        <FaPhoneAlt className="text-[#9e0910]" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Support</span>
                        <p className="text-sm font-semibold">24/7</p>
                      </div>
                    </div>
                  </div>

                  {/* دکمه رزرو */}
                  <button
                    onClick={() => setOpen(true)}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white rounded-full py-4 px-6 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Reserve Now
                      <BsArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7e0710] to-[#9e0910] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {/* اطلاعات تماس */}
                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                      📞 Call us:{" "}
                      <span className="font-semibold text-[#9e0910]">
                        +1 234 567 890
                      </span>
                    </p>
                    <p className="mt-1">
                      ✉️ Email:{" "}
                      <span className="font-semibold text-[#9e0910]">
                        reserve@foody.com
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مودال رزرو */}
      <ReserveTableModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default TableReservation;
