import Link from "next/link";
import React from "react";
import { IoFastFoodSharp } from "react-icons/io5";

function HeaderLogo({ closeMenu }) {
  return (
    <div>
      <Link
        href="/"
        className="flex items-center gap-2 group cursor-pointer"
        onClick={() => closeMenu(false)}
      >
        <div className="relative">
          <IoFastFoodSharp className="text-[#9e0910] text-3xl md:text-4xl transition-transform group-hover:rotate-12 duration-300" />
          <div className="absolute -inset-1 bg-[#9e0910]/20 rounded-full blur-md group-hover:bg-[#9e0910]/30 transition-all" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-bold leading-tight">
            <span className="text-[#9e0910]">F</span>oody
          </h1>
          <span className="text-[10px] md:text-xs text-gray-500 -mt-1">
            Delicious & Fresh
          </span>
        </div>
      </Link>
    </div>
  );
}

export default HeaderLogo;
