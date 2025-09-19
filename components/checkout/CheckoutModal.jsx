import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";

function CheckoutModal({ setOnOpenCheckout }) {
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="bg-white w-55 md:w-96 max-h-[80vh] rounded-3xl shadow-2xl overflow-y-auto p-6">
        {items.length === 0 ? (
          <Empty />
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border-b pb-2"
            >
              <div className="flex flex-col">
                <h3 className="md:font-semibold text-[10px] md:text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[8px] md:text-base">
                  ${item.price}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(removeItem(item))}
                  className="w-4 h-4 md:w-8 md:h-8 flex items-center text-[12px] justify-center rounded-full bg-red-300 hover:bg-[#9e0910] hover:text-white"
                >
                  -
                </button>
                <span className="font-semibold text-[10px] md:text-base">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(addItem(item))}
                  className="w-4 h-4 md:w-8 md:h-8 flex items-center justify-center text-[12px] rounded-full bg-red-300 hover:bg-[#9e0910] hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;
