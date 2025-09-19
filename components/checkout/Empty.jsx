import React from "react";
import { TbShoppingCartSearch } from "react-icons/tb";

function Empty() {
  return (
    <div className="flex flex-col justify-center items-center p-2 md:p-5 gap-4 md:gap-8">
      <span className="text-4xl md:text-8xl text-[#9e0910]">
        <TbShoppingCartSearch />
      </span>
      <p className="text-xs md:text-2xl text-center text-[#9e0910]">
        Your shopping cart is empty!!!!
      </p>
    </div>
  );
}

export default Empty;
