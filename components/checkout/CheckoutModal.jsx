import { addItem, removeItem } from "@/redux-toolkit/features/CheckoutSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function CheckoutModal() {
  const items = useSelector((state) => state.checkout.selectedItems);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="bg-white w-96 max-h-[80vh] rounded-3xl shadow-2xl overflow-y-auto p-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between mb-4 border-b pb-2"
          >
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(removeItem(item))}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => dispatch(addItem(item))}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutModal;
