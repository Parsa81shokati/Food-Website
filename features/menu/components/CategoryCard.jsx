import React from "react";
import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs";

function CategoryCard({ data, category }) {
  const isActive = data.name === category;

  return (
    <div className="relative group">
      <div
        className={`relative flex flex-col items-center justify-center rounded-xl md:rounded-2xl w-20 h-20 md:w-28 md:h-28 transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-br from-[#9e0910] to-[#c20e17] text-white shadow-xl scale-105"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        {/* آیکون تیک برای دسته‌بندی فعال */}
        {/* {isActive && (
          <div className="absolute -top-1 -right-1 z-10">
            <BsCheckCircleFill className="text-white text-sm md:text-base drop-shadow-lg" />
          </div>
        )} */}

        {/* تصویر */}
        <div className="relative w-10 h-10 md:w-14 md:h-14 mb-1">
          <Image
            alt={data.name}
            src={data.image?.url || data.image}
            fill
            sizes="(max-width: 768px) 40px, 56px"
            className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
              isActive ? "brightness-90 " : ""
            }`}
          />
        </div>

        {/* نام دسته‌بندی */}
        <h3
          className={`text-[10px] md:text-xs font-medium text-center px-1 ${
            isActive ? "text-white" : "text-gray-600"
          }`}
        >
          {data.name}
        </h3>

        {/* خط زیرین برای حالت هاور */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#9e0910] transition-all duration-300 group-hover:w-8 ${
            isActive ? "w-8 bg-white" : ""
          }`}
        />
      </div>

      {/* افکت سایه در هاور */}
      {!isActive && (
        <div className="absolute -inset-1 bg-[#9e0910]/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}
    </div>
  );
}

export default CategoryCard;
