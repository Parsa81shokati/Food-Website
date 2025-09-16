import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";

function FoodsCard({ food }) {
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

  const cartItem = items.find((i) => i.id === food.id);

  return (
    <div className=" relative mt-10 md:mt-37 flex flex-col items-center justify-between h-60 md:h-95 w-43 md:w-75 bg-white border-none rounded-4xl shadow-2xl">
      {/*image*/}
      <div className="absolute -top-15 w-30 h-28 md:w-53 md:h-52 bg-white overflow-hidden  flex rounded-full items-center justify-center ">
        <Image
          src={food.image?.url}
          alt={food.title}
          width={200}
          height={150}
          className=" w-full h-full object-cover"
        />
      </div>
      <div>
        {/*title*/}
        <div className="flex flex-col font-sans items-center w-full mt-15 md:mt-23 px-2 md:px-4  ">
          <h3 className="text-sm md:text-2xl line-clamp-1 font-bold md:p-4 text-center md:h-22 ">
            {food.title}
          </h3>
        </div>

        {/*stars*/}
        <div className="flex justify-center mt-3">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
        </div>

        {/*description*/}
        <div className="mt-4">
          <p className="text-xs md:text-base line-clamp-2 text-gray-500 px-3 text-center">
            {food.description}
          </p>
        </div>
      </div>

      {/*buy and price*/}
      <div className="flex items-center justify-between px-6 mb-5 md:mb-4 w-full md:gap-23">
        <p className="text-sm md:text-xl font-bold">${food.price}</p>
        {!cartItem ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(addItem(food));
            }}
            className="flex items-center justify-center w-15 md:w-25 h-7 md:h-10 bg-red-900 text-xs md:text-lg text-white rounded-4xl"
          >
            By Now
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-red-900 text-white rounded-4xl px-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeItem(food));
              }}
              className="md:text-4xl"
            >
              -
            </button>
            <span className="text-xs md:text-lg font-bold">
              {cartItem.quantity}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addItem(food));
              }}
              className="md:text-4xl"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodsCard;
