import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";
import { calculateDiscountPrice } from "@/helper/helper";

function FoodsCard({ food }) {
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

  const cartItem = items.find((i) => i.id === food.id);

  return (
    <div className=" relative mt-10 md:mt-25 flex flex-col items-center justify-between h-60 md:h-62 w-43 md:w-50 bg-white border-none rounded-3xl shadow-2xl">
      {food.isDiscounted && (
        <div className="absolute flex flex-col -top-2 -right-3 bg-red-900 text-white text-xs font-bold w-10 h-10 items-center justify-center rounded-full shadow-[0_0_15px_rgba(127,29,29,0.6)]">
          {food.discountPercentage}%<span>off</span>
        </div>
      )}
      {/*image*/}
      <div className="absolute -top-15 md:-top-20 w-30 h-28 md:w-36 md:h-35 bg-white overflow-hidden  flex rounded-full items-center justify-center ">
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
        <div className="flex flex-col font-sans items-center text-center w-full mt-15 md:mt-17 px-2 md:px-4  ">
          <h3 className="text-sm md:text-base font-bold line-clamp-1  ">
            {food.title}
          </h3>
        </div>

        {/*stars*/}
        <div className="flex justify-center mt-3">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className="text-sm text-yellow-400" />
          ))}
        </div>

        {/*description*/}
        <div className="mt-4 md:px-5">
          <p className="text-xs md:text-sm line-clamp-2 text-gray-500 px-3 text-center">
            {food.description}
          </p>
        </div>
      </div>

      {/*buy and price*/}
      <div className="flex items-center justify-around px-4 mb-5 md:mb-5 w-full md:gap-10 ">
        <div className="flex flex-col items-start">
          {food.isDiscounted ? (
            <>
              <p className="text-xs text-gray-400 line-through">
                ${food.price}
              </p>
              <p className="text-sm md:text-base font-bold text-red-900">
                ${calculateDiscountPrice(food.price, food.discountPercentage)}
              </p>
            </>
          ) : (
            <p className="text-sm md:text-base font-bold">${food.price}</p>
          )}
        </div>

        {!cartItem ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(addItem(food));
            }}
            className="flex items-center justify-center px-3 py-1  bg-red-900 text-xs md:text-sm text-white rounded-4xl"
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
