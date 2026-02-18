import { useSelector } from "react-redux";
import { calculateDiscountPrice } from "@/helper/helper";
import { useState } from "react";

function CheckoutPage() {
  const items = useSelector((state) => state.checkout.selectedItems);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });

  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);

  const shippingCost = 5;

  // Subtotal (after item discounts)
  const subtotal = items.reduce((total, item) => {
    const finalPrice = calculateDiscountPrice(
      item.price,
      item.discountPercentage,
    );
    return total + finalPrice * item.quantity;
  }, 0);

  // Apply coupon discount
  const discountAmount = (subtotal * discountValue) / 100;

  const total = subtotal + shippingCost - discountAmount;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Example coupon validation (Replace with API call later)
  const handleApplyDiscount = () => {
    if (discountCode === "SAVE10") {
      setDiscountValue(10);
    } else if (discountCode === "SAVE20") {
      setDiscountValue(20);
    } else {
      setDiscountValue(0);
      alert("Invalid discount code");
    }
  };

  const handleSubmit = () => {
    const orderData = {
      customer: formData,
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: calculateDiscountPrice(item.price, item.discountPercentage),
      })),
      subtotal,
      shipping: shippingCost,
      couponDiscount: discountAmount,
      total,
    };

    console.log(orderData);
    // Send to backend here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Customer Info */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Customer Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="border rounded-xl p-3 focus:ring-2 focus:ring-[#9e0910] outline-none"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="border rounded-xl p-3 focus:ring-2 focus:ring-[#9e0910] outline-none"
            />
          </div>

          <textarea
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#9e0910] outline-none"
          />

          <textarea
            name="note"
            placeholder="Order Note (Optional)"
            onChange={handleChange}
            rows="2"
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#9e0910] outline-none"
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-3xl shadow-md h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          {/* Items */}
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {items.map((item) => {
              const finalPrice = calculateDiscountPrice(
                item.price,
                item.discountPercentage,
              );

              return (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(finalPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Discount Code */}
          <div className="mt-6 flex gap-2">
            <input
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Discount Code"
              className="flex-1 border rounded-xl p-2 focus:ring-2 focus:ring-[#9e0910] outline-none"
            />
            <button
              onClick={handleApplyDiscount}
              className="bg-[#9e0910] text-white px-4 rounded-xl hover:bg-[#7e0710] transition"
            >
              Apply
            </button>
          </div>

          {/* Price Details */}
          <div className="border-t mt-6 pt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>

            {discountValue > 0 && (
              <div className="flex justify-between text-[#9e0910]">
                <span>Coupon Discount ({discountValue}%):</span>
                <span>- ${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold text-[#9e0910] pt-2 border-t">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-[#9e0910] hover:bg-[#7e0710] text-white py-3 rounded-xl font-medium transition"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
