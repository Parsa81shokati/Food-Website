import React from "react";
import { BsArrowRight, BsCreditCard } from "react-icons/bs";

function SubmitButton({ handleSubmit, isSubmitting }) {
  return (
    <div>
      {" "}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-[#9e0910]/25 hover:shadow-xl hover:shadow-[#9e0910]/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 group"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          <>
            Proceed to Payment
            <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
      {/* روش‌های پرداخت */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <BsCreditCard className="text-gray-400" />
        <span className="text-xs text-gray-400 mt-1.5">Secure payment</span>
      </div>
    </div>
  );
}

export default SubmitButton;
