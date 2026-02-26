import { useState } from "react";

import { CREATE_ORDER_ITEM } from "@/lib/Mutation/createOrderItem";
import { useMutation } from "@apollo/client/react";

export default function CreateOrderItemPage() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [orderId, setOrderId] = useState("");

  const [createOrderItem, { loading, error, data }] =
    useMutation(CREATE_ORDER_ITEM);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrderItem({
        variables: {
          name,
          quantity: Number(quantity),
          price: Number(price),
          orderId,
        },
      });

      alert("آیتم سفارش با موفقیت ساخته شد ✅");

      // reset form
      setName("");
      setQuantity(1);
      setPrice(0);
      setOrderId("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
      <h1>ایجاد آیتم سفارش</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>نام محصول</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>تعداد</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>قیمت</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Order ID</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "در حال ایجاد..." : "ایجاد آیتم"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>خطا: {error.message}</p>
      )}

      {data && (
        <p style={{ color: "green", marginTop: "15px" }}>
          آیتم ساخته شد! ID: {data.createOrderItem.id}
        </p>
      )}
    </div>
  );
}
