import React from "react";

function OrderHeader({ data }) {
  return (
    <div className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] px-6 py-5 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-sm opacity-80">Order Number</p>
          <p className="text-2xl font-bold font-mono">
            #{data?.order?.orderNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderHeader;
