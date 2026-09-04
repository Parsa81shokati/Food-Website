import React, { useState } from "react";
import { IoMdClose, IoIosArrowBack } from "react-icons/io";
import Notification from "./Notification";
import useLoginFlow from "../hooks/useLoginFlow";
import LoginStep from "./LoginStep";
import VerifyStep from "./VerifyStep";
import RegisterStep from "./RegisterStep";

function LoginSignUpModal({ onClose }) {
  const {
    step,
    setStep,

    loading,

    phone,
    setPhone,

    otp,
    setOtp,

    firstName,
    setFirstName,

    lastName,
    setLastName,

    error,
    setError,

    notification,
    setNotification,

    otpSession,

    handleSendOtp,
    handleVerifyOtp,
    handlePhoneChange,
    handleRegister,

    timer,
    canResend,
    handleResendOtp,
  } = useLoginFlow(onClose);
  return (
    <>
      {notification && (
        <Notification
          key={`${notification.message}-${notification.code || ""}`}
          message={notification.message}
          type={notification.type}
          code={notification.code}
          duration={notification.code ? 10000 : 4000}
          onClose={() => setNotification(null)}
        />
      )}
      <div
        onClick={() => onClose(false)}
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md min-h-[400px] w-full rounded-3xl shadow-2xl p-8 relative animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            {step === 1 ? (
              <div />
            ) : (
              <button
                onClick={() => {
                  setStep(step - 1);
                  setError("");
                }}
                className="text-2xl text-gray-500 hover:text-gray-800 transition-colors p-1"
                aria-label="Close"
              >
                <IoIosArrowBack />
              </button>
            )}

            <button
              onClick={() => onClose(false)}
              className="text-2xl text-gray-500 hover:text-gray-800 transition-colors p-1"
              aria-label="Go back"
            >
              <IoMdClose />
            </button>
          </div>
          {step === 1 && (
            <LoginStep
              phone={phone}
              setPhone={setPhone}
              error={error}
              onSubmit={handleSendOtp}
              isLoading={loading}
              handlePhoneChange={handlePhoneChange}
              setError={setError}
            />
          )}
          {step === 2 && (
            <VerifyStep
              phone={phone}
              otp={otp}
              setOtp={setOtp}
              error={error}
              onVerify={handleVerifyOtp}
              setError={setError}
              timer={timer}
              canResend={canResend}
              onResend={handleResendOtp}
              isLoading={loading}
              otpSession={otpSession}
            />
          )}
          {step === 3 && (
            <RegisterStep
              firstName={firstName}
              lastName={lastName}
              setFirstName={setFirstName}
              setLastName={setLastName}
              error={error}
              onSubmit={handleRegister}
              isLoading={loading}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default LoginSignUpModal;
