import { verifyToken } from "@/lib/auth";
import client from "@/lib/apolloClient";
import { CREATE_ORDER } from "@/lib/Mutation/createOrder";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // 🔐 بررسی لاگین
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = verifyToken(token);

    const { peopleId, items, address, note } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 🛑 جلوگیری از جعل user
    if (decoded.id !== peopleId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // 🧮 محاسبه total سمت سرور
    const totalPrice = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    // 🧾 ساخت order number
    const orderNumber = `ORD-${Date.now()}`;
    console.log("ITEMS FROM CLIENT:", items);
    // 🚀 ساخت سفارش
    const { data } = await client.mutate({
      mutation: CREATE_ORDER,
      variables: {
        peopleId,
        orderNumber,
        totalPrice,
        address,
        notes: note,
        items: items.map((item) => ({
          meal: {
            connect: { id: item.id },
          },
          quantity: item.quantity,
          price: item.price,
        })),
      },
    });

    return res.status(200).json({
      message: "Order created successfully",
      orderId: data.createOrder.id,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
