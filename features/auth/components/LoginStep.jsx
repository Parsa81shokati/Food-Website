import { formatPhoneDisplay, toEnglishNumber } from "@/utils/formatters";
import React from "react";
import { FaPhone } from "react-icons/fa6";

function LoginStep({
  phone,
  setError,
  error,
  onSubmit,
  isLoading,
  handlePhoneChange,
}) {
  return (
    <div className="flex flex-col gap-8 mt-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 -mt-4">
        Enter your phone number to continue
      </p>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            <FaPhone />
          </span>
          <input
            type="tel"
            dir="ltr"
            inputMode="numeric"
            value={formatPhoneDisplay(phone)}
            onFocus={() => setError("")}
            onChange={(e) => {
              let value = toEnglishNumber(e.target.value).replace(/\D/g, "");

              // اگر کاربر +98 وارد کرد
              if (value.startsWith("98")) {
                value = value.slice(2);
              }

              // حذف صفرهای اضافی
              value = value.replace(/^0+/, "");

              // اضافه کردن صفر استاندارد ایران
              if (value.length > 0) {
                value = "0" + value;
              }

              handlePhoneChange(value.slice(0, 11));
            }}
            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition-all ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
            }`}
          />
        </div>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className={`bg-[#9e0910] text-white py-3 rounded-xl font-medium hover:bg-[#68070b] transition-colors focus:ring-2 focus:ring-[#9e0910]/50 focus:outline-none ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Sending..." : "Continue"}
      </button>
    </div>
  );
}

export default LoginStep;
