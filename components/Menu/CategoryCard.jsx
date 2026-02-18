import React from "react";
import Image from "next/image";

function CategoryCard({ data, category }) {
  return (
    <div>
      <div
        className={`flex flex-col bg-gray-100 rounded-xl md:rounded-3xl items-center justify-around p-0 md:p-1 w-24 h-24 md:w-30 md:h-35 md:gap-1   ${
          data.name === category
            ? "bg-white border-2 font-bold text-red-800 border-red-800 scale-105 shadow-lg"
            : ""
        }`}
      >
        <Image
          alt={data.name}
          src={data.image?.url}
          width={100}
          height={100}
          className=""
        />
        <h3 className=" text-[9px] md:text-sm ">{data.name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
