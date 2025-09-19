import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CountdownTimer } from "@/helper/helper";
import DiscountCard from "@/components/Discount/DiscountCard";

function DiscountSwiper({ discounted }) {
  return (
    <div className="flex flex-row items-center p-2 md:px-10 ">
      <div className="flex flex-col items-center justify-center gap-3 h-70 md:h-105 p-1 md:p-3 rounded-l-3xl bg-[#9e0910] text-white">
        <h2 className="text-base md:text-4xl font-bold">Food Party</h2>
        {/* <CountdownTimer className=" font-mono text-base text-white " /> */}
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1.7}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
        // navigation
        // pagination={{ clickable: true }}
        className="flex-1 w-full bg-[#9e0910] h-70 md:h-105 rounded-r-3xl border-r-2 border-[#9e0910] p-6  md:p-12 shadow-xl"
      >
        {discounted?.meals?.map((food) => (
          <SwiperSlide key={food.id} className="flex justify-center">
            <DiscountCard food={food} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DiscountSwiper;
