import Image from "next/image";
import React from "react";
import { FaStar, FaLinkedin, FaTwitter, FaFacebookF } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { BsFillStarFill, BsAward } from "react-icons/bs";
import { GiCook, GiChefToque } from "react-icons/gi";

const team = [
  {
    id: 1,
    src: "/1-min.png",
    name: "Liam Parker",
    job: "Master Chef",
    experience: "12+ years",
    specialty: "Italian Cuisine",
  },
  {
    id: 2,
    src: "/2-min.png",
    name: "Mia Thompson",
    job: "Sous Chef",
    experience: "8+ years",
    specialty: "Pastry & Desserts",
  },
  {
    id: 3,
    src: "/3-min.png",
    name: "Daniel Brooks",
    job: "Restaurant Manager",
    experience: "10+ years",
    specialty: "Wine & Service",
  },
  {
    id: 4,
    src: "/4-min.png",
    name: "James Walker",
    job: "Executive Chef",
    experience: "15+ years",
    specialty: "International Cuisine",
  },
];

function AboutUs() {
  return (
    <div
      id="aboutUs"
      className="relative pt-5 pb-15 bg-gradient-to-b from-white to-red-50/30 overflow-hidden"
    >
      {/* المان‌های تزئینی پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#9e0910]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#9e0910]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-[#9e0910]/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* بخش عنوان */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#9e0910]/10 px-4 py-2 rounded-full mb-4">
            <MdOutlineRestaurantMenu className="text-[#9e0910]" />
            <span className="text-sm font-medium text-[#9e0910]">
              Our Story
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            About{" "}
            <span className="relative">
              <span className="text-[#9e0910]">Foody</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#9e0910]/30 rounded-full" />
            </span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed mb-4">
              From traditional flavors to modern creations, our menu is designed
              to satisfy every craving. Whether you're dining in, ordering
              online, or celebrating a special occasion, we're here to make
              every moment unforgettable.
            </p>

            {/* آمارها */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8">
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-bold text-[#9e0910]">
                  50+
                </span>
                <span className="text-xs md:text-sm text-gray-500">Dishes</span>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-bold text-[#9e0910]">
                  10k+
                </span>
                <span className="text-xs md:text-sm text-gray-500">
                  Happy Clients
                </span>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-bold text-[#9e0910]">
                  15+
                </span>
                <span className="text-xs md:text-sm text-gray-500">Years</span>
              </div>
            </div>
          </div>

          {/* خط جداکننده تزئینی */}
          <div className="flex items-center justify-center gap-3 mt-12">
            <div className="w-12 h-0.5 bg-[#9e0910]/30" />
            <GiChefToque className="text-[#9e0910] text-2xl" />
            <div className="w-12 h-0.5 bg-[#9e0910]/30" />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-8">
            Meet Our <span className="text-[#9e0910]">Expert Team</span>
          </h3>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Passionate professionals dedicated to serving you the best
          </p>
        </div>

        {/* تیم */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* برچسب تجربه */}
              <div className="absolute top-3 right-3 z-20">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <BsAward className="text-sm" />
                  {member.experience}
                </div>
              </div>

              {/* تصویر */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#9e0910]/80 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />

                <Image
                  src={member.src}
                  alt={member.name}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* آیکون‌های شبکه‌های اجتماعی - ظاهر شدن در هاور */}
                {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <a
                    href={member.social.facebook}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#9e0910] hover:text-white transition-colors"
                  >
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#9e0910] hover:text-white transition-colors"
                  >
                    <FaTwitter className="text-sm" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#9e0910] hover:text-white transition-colors"
                  >
                    <FaLinkedin className="text-sm" />
                  </a>
                </div> */}
              </div>

              {/* اطلاعات */}
              <div className="p-4 text-center relative">
                {/* پس‌زمینه گرادیانت در هاور */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#9e0910]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-1 relative">
                  {member.name}
                </h4>

                <p className="text-[#9e0910] font-medium text-sm md:text-base mb-2 relative">
                  {member.job}
                </p>

                <p className="text-xs text-gray-500 relative">
                  Specialty: {member.specialty}
                </p>

                {/* ستاره‌های امتیاز */}
                <div className="flex items-center justify-center gap-0.5 mt-2 relative">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ))}
                </div>
              </div>

              {/* افکت خط زیرین */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9e0910] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
