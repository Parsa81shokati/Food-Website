import React, { useRef, useState, useEffect } from "react";

function OtpInput({
  length = 6,
  value: valueProp = "",
  onChange = () => {},
  onComplete = () => {},
  error = false,
}) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const setInputRef = (el, i) => {
    inputsRef.current[i] = el;
  };

  const handleChange = (rawValue, index) => {
    const val = rawValue.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, length).split("");
    if (digits.length === 0) return;
    const newOtp = [...otp];
    for (let i = 0; i < length; i++) {
      newOtp[i] = digits[i] || "";
    }
    setOtp(newOtp);
    const lastIndex = Math.min(digits.length, length) - 1;
    if (lastIndex >= 0) inputsRef.current[lastIndex]?.focus();
  };

  useEffect(() => {
    const joined = otp.join("");
    onChange(joined);
    if (joined.length === length && !joined.includes("")) {
      onComplete(joined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <div>
      {otp.map((digit, i) => (
        <input
          ref={(el) => setInputRef(el, i)}
          inputMode="numeric"
          pattern="[0-9]*"
          key={i}
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className={`w-14 h-14 text-center text-2xl border-2 rounded-xl outline-none transition
          ${
            error
              ? "border-red-500 focus:border-red-500 ring-1 ring-red-200"
              : "border-gray-300 focus:border-[#9e0910] focus:ring-1 focus:ring-[#f3dada]"
          }
        `}
        />
      ))}
    </div>
  );
}

export default OtpInput;
