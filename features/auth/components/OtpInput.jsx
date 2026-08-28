import { toEnglishNumber } from "@/utils/formatters";
import React, { useEffect, useRef } from "react";

function OtpInput({
  length = 6,
  value = "",
  onChange = () => {},
  onComplete = () => {},
  error = false,
  disabled = false,
}) {
  const inputsRef = useRef([]);

  const otpArray = Array.from({ length }, (_, i) => value[i] || "");

  const setInputRef = (el, index) => {
    inputsRef.current[index] = el;
  };

  useEffect(() => {
    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 50);
  }, []);

  const updateOtp = (newOtpArray) => {
    const newValue = newOtpArray.join("");
    onChange(newValue);

    if (newValue.length === length) {
      onComplete(newValue);
    }
  };

  const handleChange = (e, index) => {
    const val = toEnglishNumber(e.target.value).replace(/\D/g, "").slice(-1);

    const newOtp = [...otpArray];

    newOtp[index] = val;

    updateOtp(newOtp);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otpArray];

      if (newOtp[index]) {
        newOtp[index] = "";
        updateOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        updateOtp(newOtp);

        inputsRef.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData.getData("text");

    const digits = toEnglishNumber(paste)
      .replace(/\D/g, "")
      .slice(0, length)
      .split("");

    if (!digits.length) return;

    const newOtp = Array.from({ length }, (_, i) => digits[i] || "");

    updateOtp(newOtp);

    const lastIndex = Math.min(digits.length - 1, length - 1);

    inputsRef.current[lastIndex]?.focus();
  };

  return (
    <div className="flex gap-3">
      {otpArray.map((digit, index) => (
        <input
          key={index}
          ref={(el) => setInputRef(el, index)}
          value={digit}
          disabled={disabled}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={`
            w-12 h-12 sm:w-14 sm:h-14
            text-center text-xl sm:text-2xl
            border-2 rounded-xl
            outline-none
            transition-all

            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
            }

            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : "bg-white"
            }
          `}
        />
      ))}
    </div>
  );
}

export default OtpInput;
