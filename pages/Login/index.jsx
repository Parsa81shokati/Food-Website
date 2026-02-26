import { CREATE_USER } from "@/lib/Mutation/login";
import { useLazyQuery, useMutation } from "@apollo/client/react";

import React, { useState } from "react";

function LoginForm() {
  const [phone, setPhone] = useState("");

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const handleRegister = async () => {
    try {
      const { data } = await createUser({
        variables: { phone, lastName, firstName },
      });

      if (data?.createPeople) {
        alert("ثبت نام موفق بود، خوش آمدید " + data.createPeople.firstName);
      }
    } catch (err) {
      console.error(err);
      alert("خطا در ثبت نام");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-15 gap-4">
      <>
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-80 h-10 border border-gray-300 rounded px-2"
        />
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
    </div>
  );
}

export default LoginForm;
