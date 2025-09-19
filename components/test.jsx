import React, { useState, useRef } from "react";

function OtpInput({ length = 6, onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // فقط عدد
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // اگر عدد پر شد برو بعدی
    if (value && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-14 h-14 text-center text-2xl border-2 rounded-xl 
                     border-gray-300 focus:border-[#9e0910] focus:ring-[#9e0910] outline-none"
        />
      ))}
    </div>
  );
}

export default OtpInput;
