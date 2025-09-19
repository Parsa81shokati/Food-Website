import Image from "next/image";
import React from "react";

function TableReservation() {
  return (
    <div id="reservation" className="py-15">
      <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-30 bg-red-50 p-10 md:py-10">
        <div className="rounded-full overflow-hidden bg-red-100 ">
          <Image
            src="/table.png"
            alt="Table Reserv"
            width={600}
            height={600}
            className="rounded-full p-5 md:p-10"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-6 md:p-6 ">
          <h3 className="text-2xl md:text-6xl font-bold">
            <span className="text-3xl md:text-7xl text-[#9e0910]">
              Reserve{" "}
            </span>
            Your Table
          </h3>
          <p className=" text-xs md:text-2xl md:mt-15">
            "Secure your spot in advance and enjoy a seamless dining experience.
            Whether it’s a special occasion or a casual night out, we’ll make
            sure your table is ready."
          </p>
          <button className="w-30 h-8 md:w-55 md:h-18 mt-5 md:mt-25 bg-[#9e0910] text-sm md:text-2xl text-white rounded-full">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableReservation;
