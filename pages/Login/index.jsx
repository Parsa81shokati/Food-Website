import { CREATE_USER } from "@/lib/Mutation/login";
import { GET_USER_BY_PHONE } from "@/lib/queries/UserLogin";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { data } from "autoprefixer";
import React, { useState } from "react";

function LoginForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState(1);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const [getUser] = useLazyQuery(GET_USER_BY_PHONE);
  const [createUser] = useMutation(CREATE_USER);

  const handleSendOtp = async () => {
    if (!phone) {
      alert("please Enter your phone!");
      return;
    }

    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("phone Not Valid!");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP code:", otp, "for phone:", phone);
    setGeneratedOtp(otp);
    setStep(2);
  };

  const handleVerifyOtp = async () => {
    if (otp == generatedOtp) {
      // چک کن توی Hygraph یوزر هست یا نه
      const result = await getUser({ variables: { phone } });
      const users = result.data?.users || [];

      if (users.length > 0) {
        alert("خوش آمدی " + (users[0].lastName || ""));
        // اینجا می‌تونی کاربر رو لاگین شده در نظر بگیری
      } else {
        // اگر نبود برو مرحله گرفتن نام خانوادگی
        setStep(3);
      }
    } else {
      alert("کد وارد شده اشتباه است ❌");
    }
  };

  const handleRegister = async () => {
    const { data } = await createUser({
      variables: { phone, lastName, firstName },
    });
    if (data.createPeople) {
      alert("ثبت نام موفق بود، خوش آمدید " + data.createPeople.firstName);
      // اینجا کاربر جدید رو لاگین کن
    }
    console.log(data);
  };

  console.log(firstName, lastName, phone, data);

  return (
    <div className="flex flex-col items-center justify-center py-15 gap-4">
      {step === 1 && (
        <>
          <input
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-80 h-10 border border-gray-300 rounded px-2"
          />
          <button
            onClick={handleSendOtp}
            className="bg-gray-200 w-30 px-4 py-2 rounded hover:bg-gray-300"
          >
            send
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-80 h-10 border border-gray-300 rounded px-2"
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-green-400 w-30 px-4 py-2 rounded hover:bg-green-500 text-white"
          >
            verify
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-80 h-10 border border-gray-300 rounded px-2"
          />
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-80 h-10 border border-gray-300 rounded px-2"
          />
          <button
            onClick={handleRegister}
            className="bg-blue-400 w-30 px-4 py-2 rounded hover:bg-blue-500 text-white"
          >
            Register
          </button>
        </>
      )}
    </div>
  );
}

export default LoginForm;
