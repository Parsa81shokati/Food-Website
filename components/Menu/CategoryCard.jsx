import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function CategoryCard({ data, category }) {
  return (
    <div>
      <div
        className={`flex flex-col bg-gray-100 rounded-xl md:rounded-3xl items-center justify-center p-0 md:p-1 w-24 h-24 md:w-50 md:h-50 md:gap-2   ${
          data.name === category
            ? "bg-gray-200 border-2 font-bold border-gray-300 scale-105 shadow-lg"
            : ""
        }`}
      >
        <Image alt={data.name} src={data.image?.url} width={300} height={400} />
        <h3 className=" text-[9px] md:text-lg  ">{data.name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
