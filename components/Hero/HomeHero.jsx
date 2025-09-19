import Image from "next/image";
import Link from "next/link";
import React from "react";

function HomeHero() {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between md:mx-10 ">
      <div className="flex flex-col items-center md:items-start md:ml-25 gap-7 md:gap-12 mt-8 md:mt-13">
        <h1 className="text-4xl/10 md:text-8xl/25 font-bold text-left">
          Delicious
          <br className="hidden md:flex" />
          <span className="text-[#9e0910]"> food</span> is <br /> waiting for
          you
        </h1>
        <p className="text-gray-600 text-xs md:text-xl flex flex-wrap text-left ml-6 md:ml-0 ">
          From comforting classics to exciting new flavors, we bring <br /> the
          taste you love closer than ever. Your next favorite dish
          <br /> is just a click away.
        </p>
        <button className="w-32 h-10 md:w-60 md:h-15 bg-[#9e0910] text-white md:text-xl my-7 md:my-10 rounded-4xl">
          <Link href="/Menu">View Menu</Link>
        </button>
      </div>
      <div>
        <Image
          src="/newfish.png"
          alt="Delicious Fish"
          width={900}
          height={1100}
        />
      </div>
    </div>
  );
}

export default HomeHero;
