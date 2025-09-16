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
    <div className=" relative mt-37 flex flex-col justify-center items-center h-95 w-75 bg-white border-none rounded-4xl shadow-2xl">
      <div className=" -top-5 -right-5 absolute flex items-center justify-start mb-3 ">
        <FaStar className="text-yellow-400 mr-1 text-6xl" />
        <span className=" right-5 font-bold top-5 absolute text-lg text-gray-700">
          5.0
        </span>
      </div>

      <div className="absolute -top-15 w-53 h-52 bg-white overflow-hidden p-1 flex items-center justify-center ">
        <Image
          src={food.image?.url}
          alt={food.title}
          width={200}
          height={150}
          className=" w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col font-sans items-center w-full mt-25 px-4 ">
        <h3 className=" text-2xl font-bold p-4 text-center mt-7 h-22 ">
          {food.title}
        </h3>
        <p className="text-base text-gray-500 px-3 text-center">
          {food.description}
        </p>
      </div>

      <div className="flex items-center justify-center mt-6 mb-4 w-full gap-23">
        <p className="text-xl font-bold  ">${food.price}</p>
        {!cartItem ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(addItem(food));
            }}
            className="flex items-center justify-center w-25 h-10 bg-red-900 text-lg text-white rounded-4xl"
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
              className="text-4xl"
            >
              -
            </button>
            <span className="text-lg font-bold">{cartItem.quantity}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addItem(food));
              }}
              className="text-4xl"
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
