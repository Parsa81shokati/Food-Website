import React from "react";
import { FaTag } from "react-icons/fa";

function DiscountCode({ setDiscountCode }) {
  return (
    <div className="pt-2 border-t border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <FaTag className="inline mr-1.5 text-gray-400" />
        Discount Code
      </label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            // value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Enter code"
            // disabled={!!appliedCode}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          />
        </div>

        {/* {!appliedCode ? (
                         <button
                           onClick={handleApplyDiscount}
                           disabled={!discountCode.trim()}
                           className="px-4 py-2.5 bg-[#9e0910] text-white rounded-xl text-sm font-medium hover:bg-[#7e0710] transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                         >
                           Apply
                         </button>
                       ) : (
                         <button
                           onClick={handleRemoveDiscount}
                           className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-300 transition whitespace-nowrap"
                         >
                           Remove
                         </button>
                       )} */}
      </div>

      {/* {appliedCode && (
                       <p className="text-green-600 text-xs mt-1.5 flex items-center gap-1">
                         <BsCheckCircleFill className="text-green-500" />
                         Code <strong>{appliedCode}</strong> applied — 10% off
                       </p>
                     )} */}
    </div>
  );
}

export default DiscountCode;
