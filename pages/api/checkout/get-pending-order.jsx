import { verifyToken } from "@/lib/auth/jwt";
import client from "@/lib/apollo/Client";
import { GET_PENDING_ORDER } from "@/features/checkout/queries/GetPendingOrder";
import { UPDATE_ORDER_PAYMENT_STATUS } from "@/features/checkout/mutation/UpdatePaymentStatus";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
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

    const { data } = await client.query({
      query: GET_PENDING_ORDER,
      variables: {
        userId: decoded.id,
      },
      fetchPolicy: "network-only",
    });

    const order = data.orders[0];

    if (!order) {
      return res.status(200).json({
        exists: false,
      });
    }

    const isExpired = new Date(order.expiresAt) < new Date();

    if (isExpired) {
      await client.mutate({
        mutation: UPDATE_ORDER_PAYMENT_STATUS,
        variables: {
          id: order.id,
          status: "faild",
        },
      });

      return res.status(200).json({
        exists: false,
      });
    }

    return res.status(200).json({
      exists: true,
      orderId: order.id,
      totalPrice: order.totalPrice,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}
