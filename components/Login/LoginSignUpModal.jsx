import React, { useState } from "react";
import { IoMdClose, IoIosArrowBack } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import OtpInput from "./OtpInput";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GET_USER_BY_PHONE } from "@/lib/queries/UserLogin";
import { FaPhone } from "react-icons/fa6";
import { CREATE_USER } from "@/lib/Mutation/login";
import Notification from "../Notification";

function LoginSignUpModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const [getUser] = useLazyQuery(GET_USER_BY_PHONE);
  const [createUser] = useMutation(CREATE_USER);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleSendOtp = async () => {
    setError("");

    if (!/^09\d{9}$/.test(phone)) {
      setError("Phone number must be 11 digits starting with 09");
      return;
    }

    try {
      const res = await fetch("/api/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }

      setStep(2);
    } catch (err) {
      setError("Network error. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("/api/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code");
        return;
      }

      const result = await getUser({ variables: { phone } });
      const users = result.data?.peoples || [];
      const id = users[0].id;

      if (users.length > 0) {
        await fetch("/api/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, id }),
        });

        showNotification(
          `Welcome back ${users[0].firstName || ""}! 🎉`,
          "success",
        );

        setTimeout(() => onClose(false), 1500);
      } else {
        setStep(3);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName) {
      setError("❌ Please fill in the fields.");
      return;
    }
    if (firstName.length < 2 || lastName.length < 2)
      return "field must be at least 2 characters";
    if (firstName.length > 50 || lastName.length > 50)
      return "field must be less than 50 characters";

    try {
      const result = await createUser({
        variables: { phone, lastName, firstName },
      });

      const id = result.data?.createPeople?.id;

      if (result.data?.createPeople) {
        await fetch("/api/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, id }),
        });

        showNotification(
          `Welcome ${result.data.createPeople.firstName}! 🎉`,
          "success",
        );

        setTimeout(() => onClose(false), 1500);
      }
    } catch (err) {
      showNotification("Network error. Please check your connection.", "error");
      console.error("Registration error:", err);
    }
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div
        onClick={() => onClose(false)}
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-8 relative animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            {step === 1 ? (
              <div />
            ) : (
              <button
                onClick={() => setStep(step - 1)}
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
                    inputMode="numeric"
                    placeholder="09123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                onClick={handleSendOtp}
                className="bg-[#9e0910] text-white py-3 rounded-xl font-medium hover:bg-[#68070b] transition-colors focus:ring-2 focus:ring-[#9e0910]/50 focus:outline-none"
              >
                Continue
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-8 mt-4">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Verification Code
              </h2>
              <p className="text-center text-gray-500 -mt-4">
                Enter the 6-digit code sent to {phone}
              </p>

              <div className="flex flex-col items-center justify-center space-y-4">
                <OtpInput
                  length={6}
                  value={otp}
                  onChange={(val) => {
                    setOtp(val);
                    setError("");
                  }}
                  error={!!error}
                />
                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}
              </div>

              <button
                onClick={handleVerifyOtp}
                className="bg-[#9e0910] text-white py-3 rounded-xl font-medium hover:bg-[#68070b] transition-colors focus:ring-2 focus:ring-[#9e0910]/50 focus:outline-none"
              >
                Verify
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-8 mt-4">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Create Account
              </h2>
              <p className="text-center text-gray-500 -mt-4">
                Enter your details to complete registration
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                      <HiOutlineUserCircle />
                    </span>
                    <input
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                      <HiOutlineUserCircle />
                    </span>
                    <input
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all focus:border-[#9e0910] focus:ring-2 focus:ring-[#9e0910]/20"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              <button
                onClick={handleRegister}
                className="bg-[#9e0910] text-white py-3 rounded-xl font-medium hover:bg-[#68070b] transition-colors focus:ring-2 focus:ring-[#9e0910]/50 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginSignUpModal;
