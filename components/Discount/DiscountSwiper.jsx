import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { CountdownTimer } from "@/helper/helper";
import DiscountCard from "@/components/Discount/DiscountCard";
import { useState } from "react";
import { BsLightningCharge, BsFire } from "react-icons/bs";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

function DiscountSwiper({ discounted }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [showNav, setShowNav] = useState(false);

  if (!discounted?.meals?.length) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* بخش عنوان و تایمر */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9e0910] to-[#c20e17] rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-r from-[#9e0910] to-[#c20e17] p-3 rounded-full text-white">
              <GiPartyPopper className="text-2xl md:text-3xl" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Food <span className="text-[#9e0910]">Party</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              Special discounts just for you
            </p>
          </div>
        </div>

        {/* تایمر - استفاده از CountdownTimer آماده */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BsFire className="text-[#9e0910] text-xl animate-pulse" />
            <span className="text-sm font-medium text-gray-600">Ends in:</span>
          </div>
          <div className="bg-gradient-to-b from-[#9e0910] to-[#c20e17] text-white rounded-lg px-4 py-2 text-center min-w-[120px] shadow-lg">
            {/* <CountdownTimer /> */}
          </div>
        </div>
      </div>

      {/* بخش اصلی اسلایدر */}
      <div
        className="relative group"
        onMouseEnter={() => setShowNav(true)}
        onMouseLeave={() => setShowNav(false)}
      >
        {/* دکمه‌های ناوبری */}
        <button
          onClick={() => swiperRef?.slidePrev()}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#9e0910] hover:bg-[#9e0910] hover:text-white transition-all duration-300 ${
            showNav ? "opacity-100" : "opacity-0 md:opacity-0"
          }`}
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={() => swiperRef?.slideNext()}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#9e0910] hover:bg-[#9e0910] hover:text-white transition-all duration-300 ${
            showNav ? "opacity-100" : "opacity-0 md:opacity-0"
          }`}
        >
          <FaArrowRight />
        </button>

        {/* اسلایدر اصلی */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#9e0910]/5 via-white to-[#9e0910]/5 p-6 md:p-9">
          {/* پس‌زمینه تزئینی */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#9e0910] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#9e0910] rounded-full blur-3xl" />
          </div>

          <Swiper
            onSwiper={setSwiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={15}
            slidesPerView={1.2}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 15 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 20 },
              1024: { slidesPerView: 3.5, spaceBetween: 25 },
              1280: { slidesPerView: 4.5, spaceBetween: 30 },
            }}
            className="!px-2 md:!px-4"
          >
            {discounted.meals.map((food, index) => (
              <SwiperSlide key={food.id || index}>
                <div className="flex justify-center transform transition-all duration-300 mb-2 hover:scale-103 hover:-translate-y-1">
                  <DiscountCard food={food} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* نشانگر پیشرفت */}
          <div className="flex justify-center mt-6 gap-2">
            {discounted.meals.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef?.slideTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  swiperRef?.realIndex === index
                    ? "w-8 bg-[#9e0910]"
                    : "w-2 bg-gray-300 hover:bg-[#9e0910]/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* برچسب ویژه */}
        <div className="absolute -top-3 -right-3 z-30">
          <div className="relative">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-sm font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-1">
              <BsLightningCharge className="animate-pulse" />
              Limited Time
            </div>
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-50" />
          </div>
        </div>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .swiper-slide {
          height: auto;
          display: flex;
        }

        /* استایل اسکرول‌بار برای دسکتاپ */
        @media (min-width: 1024px) {
          .group:hover .opacity-0 {
            opacity: 1;
          }
        }

        /* انیمیشن برای کارت‌ها */
        .hover\\:scale-105 {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}

export default DiscountSwiper;
