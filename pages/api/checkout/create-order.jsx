import { verifyToken } from "@/lib/auth/jwt";
import client from "@/lib/apollo/Client";
import {
  CREATE_ORDER,
  PUBLISH_ORDER,
  PUBLISH_ORDERITEM,
} from "@/features/checkout/mutation/createOrder";
import { GET_FOODS_BY_IDS } from "@/features/checkout/queries/GetFoodsByIds";
import { GET_PENDING_ORDER } from "@/features/checkout/queries/GetPendingOrder";

const COUPONS = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME15: 15,
  FOODY5: 5,
};

const SHIPPING_COST = 5;
const FREE_SHIPPING_THRESHOLD = 50;

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

    const { items, customerName, customerPhone, address, note } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: "Cart is empty",
      });
    }

    if (!customerName?.trim()) {
      return res.status(400).json({
        error: "Customer name is required",
      });
    }

    if (!customerPhone?.trim()) {
      return res.status(400).json({
        error: "Customer phone is required",
      });
    }

    if (!/^09\d{9}$/.test(customerPhone)) {
      return res.status(400).json({
        error: "Invalid phone number",
      });
    }

    if (address.trim().length < 10) {
      return res.status(400).json({
        error: "Address is too short",
      });
    }

    for (const item of items) {
      if (!item.id) {
        return res.status(400).json({
          error: "Meal id is required",
        });
      }

      if (
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20
      ) {
        return res.status(400).json({
          error: "Invalid quantity",
        });
      }
    }

    const mealIds = items.map((item) => item.id);

    //گرفتن قیمت واقعی از دیتابیس
    const { data: mealsData } = await client.query({
      query: GET_FOODS_BY_IDS,
      variables: {
        ids: mealIds,
      },
      fetchPolicy: "network-only",
    });

    if (mealsData.meals.length !== mealIds.length) {
      return res.status(400).json({
        error: "One or more meals do not exist.",
      });
    }

    //برای پیدا کردن سریع تر غذا
    const mealMap = {};

    mealsData.meals.forEach((meal) => {
      mealMap[meal.id] = meal;
    });

    //جمع کل سفارش قبل از کوپن و ارسال.
    let subtotal = 0;

    const orderItems = [];

    for (const item of items) {
      const meal = mealMap[item.id];

      // محاسبه قیمت واقعی غذا
      let finalPrice = meal.price;

      if (meal.isDiscounted && meal.discountPercentage > 0) {
        finalPrice = meal.price - (meal.price * meal.discountPercentage) / 100;
      }

      // اضافه کردن به جمع کل سفارش
      subtotal += finalPrice * item.quantity;
      subtotal = Number(subtotal.toFixed(2));

      // ساخت OrderItem برای ذخیره در دیتابیس
      orderItems.push({
        meal: {
          connect: {
            id: meal.id,
          },
        },

        quantity: item.quantity,

        // Snapshot Price
        price: parseFloat(finalPrice.toFixed(2)),
      });
    }

    const shippingCost =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

    const discountAmount = 0;

    const roundedSubtotal = parseFloat(subtotal.toFixed(2));

    const totalPrice = parseFloat(
      (roundedSubtotal + shippingCost - discountAmount).toFixed(2),
    );

    const orderNumber = `ORD-${Date.now()}`;

    const { data: pendingData } = await client.query({
      query: GET_PENDING_ORDER,
      variables: {
        userId: decoded.id,
      },
      fetchPolicy: "network-only",
    });

    console.log("pendingData:", pendingData);

    const pendingOrder = pendingData.orders[0];

    if (pendingOrder) {
      return res.status(200).json({
        success: true,
        existing: true,
        orderId: pendingOrder.id,
        pricing: {
          totalPrice: pendingOrder.totalPrice,
        },
      });
    }

    const expiresAt = new Date(Date.now() + 60 * 1000).toISOString();

    const { data } = await client.mutate({
      mutation: CREATE_ORDER,
      variables: {
        peopleId: decoded.id,
        orderNumber,
        subtotal: roundedSubtotal,
        totalPrice,
        address,
        notes: note,
        customerName,
        customerPhone,
        shippingCost,
        discountAmount,
        paymentStatus: "PENDING",
        orderStatus: "PENDING",
        expiresAt,
        items: orderItems,
      },
    });

    const orderId = data.createOrder.id;

    const orderItemIds = data.createOrder.orderItems.map((item) => item.id);

    await client.mutate({
      mutation: PUBLISH_ORDER,
      variables: {
        id: orderId,
      },
    });

    for (const itemId of orderItemIds) {
      const { data: publishItemData } = await client.mutate({
        mutation: PUBLISH_ORDERITEM,
        variables: {
          id: itemId,
        },
      });
    }

    return res.status(200).json({
      success: true,

      orderId: data.createOrder.id,

      pricing: {
        subtotal,
        shippingCost,
        discountAmount,
        totalPrice,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}
