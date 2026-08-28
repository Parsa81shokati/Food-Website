import { useRouter } from "next/router";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function OrderActions() {
  const router = useRouter();
  return (
    <div className="pt-4">
      <button
        onClick={() => router.push("/")}
        className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition flex items-center justify-center gap-2"
      >
        <FaArrowLeft /> Back to Home
      </button>
    </div>
  );
}

export default OrderActions;
