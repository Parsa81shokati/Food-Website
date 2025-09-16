import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function FoodDetails({ food }) {
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

  const cartItem = items.find((i) => i.id === food.id);
  return (
    <div>
      <div
        className="flex flex-row items-center justify-center border-3 bg-white border-red-800 rounded-3xl mx-4
      md:mx-0 "
      >
        <div className="md:p-4">
          <Image src={food.image.url} width={300} height={400} />
        </div>

        <div className=" flex flex-col justify-around py-6 px-3 md:pr-15 md:mt-10 ">
          <div>
            <h3 className="text-lg/6 md:text-5xl font-bold ">{food.title}</h3>
            <p className="text-xs md:text-2xl text-gray-500 mt-3 md:mt-12 ">
              {food.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 md:mt-27">
            <p className="md:text-4xl font-bold ">${food.price}</p>
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
      </div>
    </div>
  );
}

export default FoodDetails;
