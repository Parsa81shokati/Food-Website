import Image from "next/image";
import Link from "next/link";
import React from "react";

function HomeHero() {
  return (
    <div className="flex flex-col items-center md:items-start md:flex-row justify-center md:justify-around md:ml-20 my-8 md:my-0 gap-10 md:gap-20 ">
      <div className="flex flex-col items-center  md:items-start gap-6 md:gap-9 text-center md:text-left mt-15 ">
        <h1 className="text-4xl/10 md:text-5xl/14 font-bold">
          Delicious
          <br className="hidden md:flex" />
          <span className="text-[#9e0910] font-extrabold hover:underline transition">
            {" "}
            food{" "}
          </span>
          is <br /> waiting for you
        </h1>
        <p className="text-gray-600 text-xs md:text-base/5 flex flex-wrap text-left max-w-md ml-6 md:ml-0 leading-relaxed">
          From comforting classics to exciting new flavors, we bring the taste
          you love closer than ever. Your next favorite dish is just a click
          away.
        </p>

        <Link
          href="/Menu"
          className="w-32 h-10 bg-[#9e0910] text-white my-7 md:my-2 rounded-full flex items-center justify-center hover:bg-[#7f070d] transition"
        >
          View Menu
        </Link>
      </div>
      <div>
        <Image
          src="/fishy.png"
          alt="Delicious Fish"
          width={600}
          height={500}
          className="rounded-xl md:max-w-lg lg:max-w-xl"
        />
      </div>
    </div>
  );
}

export default HomeHero;
