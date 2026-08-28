import { useRouter } from "next/router";
import { FaCheckCircle, FaTruck, FaUtensils, FaReceipt } from "react-icons/fa";
import { MdPayment, MdShoppingCart } from "react-icons/md";
import { useQuery } from "@apollo/client/react";
import { GET_ORDER } from "@/features/checkout/queries/OrderTracking";
import OrderTimeline from "../../features/checkout/components/orderTracking/OrderTimeline";
import CustomerInfo from "../../features/checkout/components/orderTracking/CustomerInfo";
import OrderItems from "../../features/checkout/components/orderTracking/OrderItems";
import PaymentSummary from "../../features/checkout/components/orderTracking/PaymentSummary";
import OrderActions from "../../features/checkout/components/orderTracking/OrderActions";
import OrderHeader from "../../features/checkout/components/orderTracking/OrderHeader";
import client from "@/lib/apollo/Client";
import { verifyToken } from "@/lib/auth/jwt";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  const decoded = verifyToken(token);
  const { orderId } = context.params;

  const { data } = await client.query({
    query: GET_ORDER,
    variables: {
      id: orderId,
    },
    fetchPolicy: "network-only",
  });

  if (!data?.order || data.order.people.id !== decoded.id) {
    return { notFound: true };
  }

  return {
    props: {
      initialOrder: data.order,
    },
  };
}

const steps = [
  {
    key: "PENDING",
    label: "Waiting for Restaurant Approval",
    icon: <MdShoppingCart />,
  },
  {
    key: "CONFIRMED",
    label: "Order Confirmed",
    icon: <MdPayment />,
  },
  {
    key: "PREPARING",
    label: "Preparing Your Order",
    icon: <FaUtensils />,
  },
  {
    key: "SENT",
    label: "On the Way",
    icon: <FaTruck />,
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    icon: <FaCheckCircle />,
  },
];

export default function OrderTracking({ initialOrder }) {
  const [isPolling, setIsPolling] = useState(true);
  const { data, error, startPolling, stopPolling } = useQuery(GET_ORDER, {
    variables: { id: initialOrder.id },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    pollInterval: 0, // ابتدا خاموش
  });
  const order = data?.order || initialOrder;
  const delivered = order?.orderStatus === "DELIVERED";

  const status = (order?.orderStatus || "PENDING").toUpperCase();

  const currentStepIndex = steps.findIndex((step) => step.key === status);

  const safeStepIndex = currentStepIndex === -1 ? 0 : currentStepIndex;
  // محاسبه درصد پیشرفت برای نوار
  const progressPercentage = ((safeStepIndex + 1) / steps.length) * 100;

  // مدیریت Polling
  useEffect(() => {
    if (delivered) {
      stopPolling();
      setIsPolling(false);
    } else {
      startPolling(50000); // هر ۴ ثانیه — مناسب برای پیگیری سفارش
      setIsPolling(true);
    }

    return () => stopPolling();
  }, [delivered, startPolling, stopPolling]);

  useEffect(() => {
    console.log(
      `Polling is ${isPolling ? "ACTIVE" : "STOPPED"} - Status: ${status}`,
    );
  }, [isPolling, order?.orderStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-14 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* هدر صفحه */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#9e0910]/10 px-4 py-2 rounded-full mb-4">
            <FaReceipt className="text-[#9e0910]" />
            <span className="text-sm font-medium text-[#9e0910]">
              Order Tracking
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Track Your <span className="text-[#9e0910]">Order</span>
          </h1>
        </div>

        {/* کارت اصلی */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <OrderHeader data={order} />

          <div className="p-6  space-y-8">
            <OrderTimeline
              progressPercentage={progressPercentage}
              steps={steps}
              currentStepIndex={currentStepIndex}
            />

            <CustomerInfo order={order} />

            <OrderItems order={order} />

            <PaymentSummary order={order} />

            <OrderActions />
          </div>
        </div>

        {/* یادآوری demo */}
        <div className="text-center mt-6 text-xs text-gray-400 border-t border-gray-200 pt-4">
          <p>
            🔒 This is a demo tracking page. Data is for display purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}

OrderTracking.getLayout = function getLayout(page) {
  return <>{page}</>; // برگرداندن صفحه بدون هیچ لایوتی
};
