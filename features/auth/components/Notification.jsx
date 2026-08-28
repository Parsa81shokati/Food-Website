// components/Notification.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdInformationCircle,
  IoMdWarning,
  IoMdCopy,
} from "react-icons/io";
import { createPortal } from "react-dom";

const iconMap = {
  success: IoMdCheckmarkCircle,
  error: IoMdCloseCircle,
  info: IoMdInformationCircle,
  warning: IoMdWarning,
};

const colorMap = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: "text-green-500",
    progress: "bg-green-500",
    codeBg: "bg-green-100",
    codeBorder: "border-green-300",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: "text-red-500",
    progress: "bg-red-500",
    codeBg: "bg-red-100",
    codeBorder: "border-red-300",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: "text-blue-500",
    progress: "bg-blue-500",
    codeBg: "bg-blue-100",
    codeBorder: "border-blue-300",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: "text-yellow-500",
    progress: "bg-yellow-500",
    codeBg: "bg-yellow-100",
    codeBorder: "border-yellow-300",
  },
};

const Notification = ({
  id,
  message,
  code, // کد OTP (مثلاً "123456")
  type = "success",
  duration,
  onClose,
  position = "top-right",
  showProgress = true,
  pauseOnHover = true,
  className = "",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const remainingRef = useRef(duration);

  const Icon = iconMap[type] || IoMdInformationCircle;
  const colors = colorMap[type] || colorMap.info;

  console.log(duration);

  // ----- مدیریت تایمر با قابلیت توقف/ادامه (مشابه قبل) -----
  useEffect(() => {
    if (isPaused) {
      clearTimeout(timerRef.current);
      return;
    }
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = remainingRef.current - elapsed;
    if (remaining <= 0) {
      onClose(id);
      return;
    }
    const updateProgress = () => {
      const newElapsed = Date.now() - startTimeRef.current;
      const newRemaining = remainingRef.current - newElapsed;
      const percent = Math.max(0, (newRemaining / remainingRef.current) * 100);
      setProgress(percent);
    };
    timerRef.current = setTimeout(() => onClose(id), remaining);
    const progressInterval = setInterval(updateProgress, 100);
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressInterval);
    };
  }, [isPaused, duration, onClose, id]);

  // ----- وقفه هنگام هاور -----
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      const elapsed = Date.now() - startTimeRef.current;
      remainingRef.current = remainingRef.current - elapsed;
    }
  };
  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
      startTimeRef.current = Date.now();
    }
  };

  // ----- کپی کد در کلیپ‌بورد -----
  const handleCopyCode = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // اگر Clipboard API در دسترس نبود، از روش قدیمی استفاده کنید
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ----- موقعیت‌یابی -----
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return createPortal(
    <div
      className={`fixed z-50 max-w-sm w-full animate-slideIn ${positionClasses[position]} ${className}`}
      role="alert"
      aria-live="assertive"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg ${colors.bg} ${colors.border}`}
      >
        <Icon className={`text-2xl flex-shrink-0 ${colors.icon}`} />

        <div className="flex-1 min-w-0">
          {/* متن اصلی */}
          <p className={`font-medium ${colors.text} break-words`}>{message}</p>

          {/* نمایش کد OTP (اگر وجود داشته باشد) */}
          {code && (
            <div className="mt-2 flex items-center gap-3">
              <div
                className={`flex-1 px-3 py-2 rounded border ${colors.codeBg} ${colors.codeBorder} font-mono text-xl font-bold tracking-widest text-center select-all`}
                dir="ltr" // برای اعداد بهتر است چپ‌چین باشند
              >
                {code}
              </div>
              <button
                onClick={handleCopyCode}
                className={`flex-shrink-0 px-2 py-1 rounded text-sm font-medium transition-colors ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-label="copy"
              >
                {copied ? "✔ copied" : <IoMdCopy className="text-lg" />}
              </button>
            </div>
          )}

          {/* پروگرس‌بار */}
          {showProgress && (
            <div className="w-full h-1 mt-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ease-linear ${colors.progress}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* دکمه بستن */}
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="close"
        >
          <IoMdCloseCircle className="text-xl" />
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default React.memo(Notification);
