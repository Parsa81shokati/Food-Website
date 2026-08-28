import { verifyToken } from "@/lib/auth/jwt";
import client from "@/lib/apollo/Client";
import {
  PUBLISH_ORDER,
  UPDATE_ORDER_PAYMENT_STATUS,
} from "@/features/checkout/mutation/UpdatePaymentStatus";
import { GET_ORDER } from "@/features/checkout/queries/OrderTracking";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    const decoded = verifyToken(token);

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        error: "OrderId is required",
      });
    }

    const { data: orderData } = await client.query({
      query: GET_ORDER,
      variables: {
        id: orderId,
      },
      fetchPolicy: "network-only",
    });

    const order = orderData.order;

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    if (order.people.id !== decoded.id) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    if (order.paymentStatus === "paid") {
      return res.status(409).json({
        error: "Order already paid",
      });
    }

    console.log("CURRENT STATUS:", order.paymentStatus);

    // آپدیت سفارش در دیتابیس
    const { data } = await client.mutate({
      mutation: UPDATE_ORDER_PAYMENT_STATUS,
      variables: {
        id: orderId,
        status: "paid",
      },
    });

    console.log("UPDATED:", data.updateOrder.paymentStatus);

    await client.mutate({
      mutation: PUBLISH_ORDER,
      variables: {
        id: orderId,
      },
    });

    return res.status(200).json({
      success: true,
      order: data.updateOrder,
    });
  } catch (error) {
    console.error("PAY ORDER FULL ERROR:", {
      message: error.message,
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError,
    });
    return res.status(500).json({ error: error.message });
  }
}
