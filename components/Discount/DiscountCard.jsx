import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";

function DiscountCard({ food }) {
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

  const cartItem = items.find((i) => i.id === food.id);
  return (
    <div className=" relative mt-15 md:mt-37 flex flex-col justify-center items-center h-50 md:h-70 w-40 md:w-58 bg-white border-none rounded-4xl shadow-md">
      <div className="absolute -top-12 w-28 h-27 md:w-45 md:h-43 rounded-full border-4 md:border-6 border-red-900 bg-white overflow-hidden p-2 flex items-center justify-center">
        <Image
          src={food.image?.url}
          alt={food.title}
          width={200}
          height={150}
          className=" w-full h-full object-cover"
        />
      </div>
      <div className="flex mt-16 md:mt-23">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>
      <div className="flex flex-col items-center w-full mt-1 md:mt-3 md:px-4 flex-grow">
        <h3 className=" text-sm md:text-xl font-bold p-2 md:p-4 text-center">
          {food.title}
        </h3>
      </div>

      <div className="flex justify-around mb-5 md:mb-6 w-full md:gap-23">
        <p className=" md:text-xl font-bold">${food.price}</p>
        <div>
          {!cartItem ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addItem(food));
              }}
              className="flex items-center justify-center md:w-8 md:h-8 bg-red-900 text-white rounded-lg"
            >
              <MdAdd className="text-2xl " />
            </button>
          ) : (
            <div className="flex items-center gap-1 md:gap-2 bg-red-900 text-white rounded-4xl px-1 md:px-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(removeItem(food));
                }}
                className="text-2xl md:text-4xl"
              >
                -
              </button>
              <span className="text-sm font-bold">{cartItem.quantity}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addItem(food));
                }}
                className="text-2xl md:text-4xl"
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
