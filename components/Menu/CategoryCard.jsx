import React from "react";
import Image from "next/image";

function CategoryCard({ data }) {
  return (
    <div>
      <div className="flex flex-col bg-gray-100 border-none rounded-3xl items-center w-50 h-50 gap-3">
        <Image alt={data.name} src={data.image?.url} width={200} height={300} />
        <h3 className=" font-bold ">{data.name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
