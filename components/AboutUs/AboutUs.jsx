import Image from "next/image";
import React from "react";

const team = [
  { id: 1, src: "/1-min.png", name: "Liam Parker", job: "chef" },
  { id: 2, src: "/2-min.png", name: "Mia Thompson", job: "junior chef" },
  { id: 3, src: "/3-min.png", name: "Daniel Brooks", job: "waiter" },
  { id: 4, src: "/4-min.png", name: "James Walker", job: "head chef" },
];

function AboutUs() {
  return (
    <div
      id="aboutUs"
      className="flex flex-col justify-center items-center mb-15 px-10 md:p-8 md:mb-25"
    >
      <div className="flex flex-col items-center justify-center ">
        <h3 className="text-3xl md:text-5xl text-[#9e0910] font-bold">
          About foody
        </h3>
        <p className="text-xs md:text-xl text-center mt-3 md:mt-6">
          From traditional flavors to modern creations, our menu is designed to
          satisfy every craving. Whether you’re dining in ordering
          <br className="hidden md:flex" />
          online, or celebrating a special occasion, we’re here to make every
          moment unforgettable.
        </p>
        <p className="text-3xl md:text-5xl mt-8 md:mt-18 ">
          Meet our best team
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-7 gap-4 md:gap-5">
        {team.map((i) => (
          <div key={i.id} className="flex flex-col items-center justify-center">
            <Image
              src={i.src}
              width={400}
              height={400}
              className="rounded-4xl shadow-2xl border-3 border-white"
            />
            <h3 className="font-bold md:text-2xl mt-2 md:mt-5">{i.name}</h3>
            <p className="text-sm md:text-xl">{i.job}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
