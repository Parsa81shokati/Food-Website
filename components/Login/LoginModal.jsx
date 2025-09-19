import { CREATE_USER } from "@/lib/Mutation/login";
import { GET_USER_BY_PHONE } from "@/lib/queries/UserLogin";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import React, { useState } from "react";
import { IoIosPhonePortrait } from "react-icons/io";
import OtpInput from "./OtpInput";
import { useRouter } from "next/router";
import { IoMdClose, IoIosArrowBack } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";

function LoginModal({ setOnopenLogin }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [error, setError] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const [getUser] = useLazyQuery(GET_USER_BY_PHONE);
  const [createUser] = useMutation(CREATE_USER);

  const handleSendOtp = () => {
    setError("");
    if (!phone) {
      setError("please Enter your phone!");
      return;
    }
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setError("phone Not Valid!");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP code:", otp, "for phone:", phone);
    setGeneratedOtp(otp);

    setStep(2);
  };

  const handleVerifyOtp = async () => {
    if (otp == generatedOtp) {
      const result = await getUser({ variables: { phone } });
      const users = result.data?.peoples || [];
      console.log(result);
      console.log(phone);
      if (users.length > 0) {
        alert("Welcome " + (users[0].firstName || ""));
        setOnopenLogin(false);
      } else {
        setStep(3);
      }
    } else {
      setError("❌inValid Code");
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName) {
      setError("❌ Please fill in the fields.");
      return;
    }

    const { data } = await createUser({
      variables: { phone, lastName, firstName },
    });
    if (data.createPeople) {
      alert("success" + data.createPeople.firstName);
      setOnopenLogin(false);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      <div
        onClick={() => setOnopenLogin(false)}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />
      <div className=" relative z-20 flex justify-center items-center w-200 h-150 rounded-4xl  bg-white">
        <div className="absolute top-7 right-7">
          {step === 1 ? (
            <button
              onClick={() => setOnopenLogin(false)}
              className="text-4xl hover:text-red-600"
            >
              <IoMdClose />
            </button>
          ) : (
            <button
              onClick={() => setStep(step - 1)}
              className="text-4xl hover:text-red-600"
            >
              <IoIosArrowBack />
            </button>
          )}
        </div>
        {step === 1 && (
          <div className="flex flex-col gap-12">
            <h3 className="text-5xl font-bold text-center mb-9">Login</h3>
            <div className="relative w-full">
              <label
                htmlFor="phone"
                className=" block text-gray-700 text-xl font-bold mb-2"
              >
                phone
              </label>
              <span className="absolute top-11 flex items-center  text-5xl">
                <IoIosPhonePortrait />
              </span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={` w-full pl-12 pr-3 py-4 border-2 border-gray-200 text-2xl rounded-2xl outline-none transition ${
                  error
                    ? "border-red-500 focus:ring-red-400 focus:border-red-400"
                    : "border-gray-300 focus:ring-[#9e0910] focus:border-[#9e0910]"
                }`}
              />
            </div>
            {error && <p className="text-red-600 text-lg -mt-9">{error}</p>}
            <button
              onClick={handleSendOtp}
              className="bg-[#9e0910] text-2xl text-white w-full px-4 py-4 rounded-2xl hover:bg-[#68070b]"
            >
              login / sign up
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center gap-12">
            <label className="text-gray-700 text-2xl font-bold">
              Enter Code
            </label>
            <OtpInput
              length={6}
              value={otp}
              onChange={(val) => {
                setOtp(val);
                setError("");
              }}
              error={!!error}
            />
            {error && <p className="text-red-500 text-xl -mt-9">{error}</p>}
            <button
              onClick={handleVerifyOtp}
              className="bg-[#9e0910] text-2xl text-white w-full px-4 py-4 rounded-2xl hover:bg-[#68070b]"
            >
              Verify
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-8">
            <h3 className="text-5xl font-bold text-center mb-9">
              Create Account
            </h3>
            <div className="relative w-full">
              <label
                htmlFor="name"
                className=" block text-gray-700 text-xl font-bold mb-2"
              >
                name
              </label>
              <span className="absolute top-13 left-2 flex items-center   text-gray-600 text-4xl">
                <HiOutlineUserCircle />
              </span>
              <input
                id="name"
                placeholder="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={` w-full pl-12 pr-3 py-4 border-2 border-gray-200 text-2xl rounded-2xl outline-none transition ${
                  error
                    ? "border-red-500 focus:ring-red-400 focus:border-red-400"
                    : "border-gray-300 focus:ring-[#9e0910] focus:border-[#9e0910]"
                }`}
              />
              <label
                htmlFor="lastname"
                className=" block text-gray-700 text-xl font-bold mb-2"
              >
                last name
              </label>
              <span className="absolute top-39 left-2 flex items-center text-gray-600 text-4xl">
                <HiOutlineUserCircle />
              </span>
              <input
                id="lastname"
                placeholder="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={` w-full pl-12 pr-3 py-4 border-2 border-gray-200 text-2xl rounded-2xl outline-none transition ${
                  error
                    ? "border-red-500 focus:ring-red-400 focus:border-red-400"
                    : "border-gray-300 focus:ring-[#9e0910] focus:border-[#9e0910]"
                }`}
              />
            </div>
            {error && <p className="text-red-600 text-lg -mt-6">{error}</p>}
            <button
              onClick={handleRegister}
              className="bg-[#9e0910] text-2xl text-white w-full px-4 py-4 rounded-2xl hover:bg-[#68070b]"
            >
              sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
