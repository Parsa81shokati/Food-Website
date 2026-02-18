import { useState } from "react";
import { useSelector } from "react-redux";

export default function OrderPage({ cartItems }) {
  const items = useSelector((state) => state.checkout.selectedItems);
  console.log(items);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">ثبت سفارش</h1>

      {/* آدرس */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">آدرس ارسال</h2>
        <textarea
          //   value={address}
          //   onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="آدرس کامل"
        />
        <input
          //   value={phone}
          //   onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded p-2 mt-2"
          placeholder="شماره تماس"
        />
      </div>

      {/* کد تخفیف */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">کد تخفیف</h2>
        <div className="flex gap-2">
          <input
            // value={couponCode}
            // onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            // onClick={applyCoupon}
            className="bg-blue-600 text-white px-4 rounded"
          >
            اعمال
          </button>
        </div>
      </div>

      {/* خلاصه سفارش */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">خلاصه سفارش</h2>

        {/* {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
          </div>
        ))} */}

        <hr className="my-3" />

        <div className="flex justify-between">
          <span>جمع آیتم‌ها</span>
          {/* <span>{itemsTotal.toLocaleString()} تومان</span> */}
        </div>

        <div className="flex justify-between text-green-600">
          <span>تخفیف</span>
          {/* <span>-{discount.toLocaleString()} تومان</span> */}
        </div>

        <div className="flex justify-between">
          <span>هزینه ارسال</span>
          {/* <span>{shippingCost.toLocaleString()} تومان</span> */}
        </div>

        <div className="flex justify-between font-bold mt-3">
          <span>مبلغ نهایی</span>
          {/* <span>{totalPrice.toLocaleString()} تومان</span> */}
        </div>
      </div>

      {/* پرداخت */}
      <button
        // onClick={handlePayment}
        className="w-full bg-green-600 text-white py-3 rounded text-lg"
      >
        پرداخت
      </button>
    </div>
  );
}
