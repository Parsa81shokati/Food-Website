import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";
import { calculateDiscountPrice } from "@/helper/helper";

function DiscountCard({ food }) {
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

  const cartItem = items.find((i) => i.id === food.id);
  return (
    <div className=" relative mt-15 md:mt-27 flex flex-col justify-center items-center h-50 md:h-57 w-37 md:w-44 bg-white border-none rounded-2xl md:rounded-2xl shadow-md">
      <div className="absolute -top-12 md:-top-19 w-28 h-27 md:w-36 md:h-35 rounded-full border-4 md:border-5 border-red-900 bg-white overflow-hidden p-1 flex items-center justify-center">
        <Image
          src={food.image?.url}
          alt={food.title}
          width={200}
          height={150}
          className=" w-full h-full object-cover"
        />
      </div>
      <div className="flex mt-16 md:mt-18">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar key={i} className="text-sm text-yellow-400" />
        ))}
      </div>
      <div className="flex flex-col  items-center w-full flex-grow md:px-2">
        <h3 className=" text-sm md:text-base font-semibold p-2 md:p-4 text-center">
          {food.title}
        </h3>
      </div>

      <div className="flex justify-around items-center mb-5 w-full  ">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 line-through">
            ${food.price}
          </span>

          <span className="text-base md:text-lg font-bold text-[#9e0910]">
            ${calculateDiscountPrice(food.price, food.discountPercentage)}
          </span>
        </div>
        <div>
          {!cartItem ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addItem(food));
              }}
              className="flex items-center justify-center md:px-2 py-1.5 md:text-sm bg-red-900 text-white rounded-2xl"
            >
              {/* <MdAdd className="text-2xl " /> */}
              By Now
            </button>
          ) : (
            <div className="flex items-center gap-1 md:gap-2 bg-red-900 text-white rounded-4xl px-1 md:px-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(removeItem(food));
                }}
                className="text-3xl "
              >
                -
              </button>
              <span className="text-sm font-bold">{cartItem.quantity}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addItem(food));
                }}
                className="text-2xl"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscountCard;
