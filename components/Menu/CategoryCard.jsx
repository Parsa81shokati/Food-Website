import React from "react";
import Image from "next/image";

function CategoryCard({ data }) {
  return (
    <div>
      <div className="flex flex-col bg-gray-100 border-none rounded-2xl md:rounded-3xl items-center justify-center p-2 w-17 h-17 md:w-50 md:h-50 md:gap-3">
        <Image alt={data.name} src={data.image?.url} width={300} height={400} />
        <h3 className=" text-[7px] md:text-base ">{data.name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
