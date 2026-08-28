import React from "react";
import OtpInput from "./OtpInput";
import { MdOutlineTimer } from "react-icons/md";

function VerifyStep({
  phone,
  otp,
  setOtp,
  error,
  onVerify,
  setError,
  timer,
  canResend,
  onResend,
  isLoading,
  otpSession,
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 mt-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
        Verification Code
      </h2>
      <p className="text-center text-gray-500 -mt-3 text-sm sm:text-base">
        Enter the 6-digit code sent to {phone}
      </p>

      <div className="flex flex-col items-center space-y-4">
        <OtpInput
          length={6}
          value={otp}
          onChange={(val) => {
            if (!isLoading) {
              setOtp(val);
              setError("");
            }
          }}
          error={!!error}
          disabled={otpSession.verified}
        />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </div>
      {!otpSession.verified && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm sm:text-base">
          <div className="flex items-center gap-2 text-gray-600">
            <MdOutlineTimer className="text-xl" />
            <span>
              {timer > 0 ? (
                <>Expires in: {formatTime(timer)}</>
              ) : (
                <span className="text-green-600 font-medium">Code expired</span>
              )}
            </span>
          </div>
          <button
            onClick={onResend}
            disabled={!canResend}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              canResend
                ? "text-[#9e0910] hover:bg-[#9e0910]/10 cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Resend Code
          </button>
        </div>
      )}

      <button
        onClick={onVerify}
        disabled={isLoading}
        className={`bg-[#9e0910] text-white py-3 rounded-xl font-medium hover:bg-[#68070b] transition-colors focus:ring-2 focus:ring-[#9e0910]/50 focus:outline-none text-sm sm:text-base ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
}

export default VerifyStep;
