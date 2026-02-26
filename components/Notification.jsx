// فایل جدید: components/Notification.jsx
import React, { useEffect } from "react";
import {
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdInformationCircle,
} from "react-icons/io";

const Notification = ({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <IoMdCheckmarkCircle className="text-2xl text-green-500" />;
      case "error":
        return <IoMdCloseCircle className="text-2xl text-red-500" />;
      case "info":
        return <IoMdInformationCircle className="text-2xl text-blue-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${getBgColor()} shadow-lg`}
      >
        {getIcon()}
        <p className={`font-medium ${getTextColor()}`}>{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IoMdCloseCircle className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
