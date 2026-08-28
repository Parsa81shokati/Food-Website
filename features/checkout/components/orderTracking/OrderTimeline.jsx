import React from "react";
import { FaCheckCircle, FaCircle, FaClock } from "react-icons/fa";

function OrderTimeline({ progressPercentage, steps, currentStepIndex }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FaClock className="text-[#9e0910]" /> Order Status
      </h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Order Placed</span>
          <span>Delivered</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#9e0910] to-[#c20e17] h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-right text-xs text-gray-400 mt-1">
          {Math.round(progressPercentage)}% complete
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* خط عمودی */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6 relative">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isActive = index === currentStepIndex;
            const isFuture = index > currentStepIndex;

            return (
              <div key={step.key} className="flex items-start gap-4">
                {/* دایره وضعیت */}
                <div className="relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#9e0910] border-[#9e0910] text-white"
                        : isActive
                          ? "bg-[#9e0910]/20 border-[#9e0910] text-[#9e0910] animate-pulse"
                          : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <FaCheckCircle className="text-white" />
                    ) : isActive ? (
                      <FaCircle className="text-[#9e0910]" />
                    ) : (
                      <FaCircle className="text-gray-300" />
                    )}
                  </div>
                </div>

                {/* محتوای مرحله */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        isCompleted
                          ? "text-gray-800"
                          : isActive
                            ? "text-[#9e0910]"
                            : "text-gray-400"
                      }`}
                    >
                      {step.icon} {step.label}
                    </span>
                    {isActive && (
                      <span className="text-xs bg-[#9e0910]/10 text-[#9e0910] px-2 py-0.5 rounded-full">
                        In Progress
                      </span>
                    )}
                    {isCompleted && index < currentStepIndex && (
                      <span className="text-xs text-green-500">✓ Done</span>
                    )}
                  </div>
                  {/* {isActive && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Your order is being prepared in the kitchen.
                                </p>
                              )} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderTimeline;
