import { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useRouter } from "next/router";
import { CREATE_USER, PUBLISH_USER } from "@/features/auth/mutation/createUser";
import { GET_USER_BY_PHONE } from "@/features/auth/queries/getUserByPhone";
import {
  createSession,
  sendOtp,
  verifyOtp,
} from "@/features/auth/services/auth.service";
import { validatePhone, validateRegister } from "@/utils/authValidation";

import { isOtpStillValid } from "@/helper/helper";
import useAuth from "./useAuth";

const OTP_EXPIRE_TIME = 180;

function useLoginFlow(onClose) {
  const [step, setStep] = useState(1);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [loading, setLoading] = useState(false);

  const [otpSession, setOtpSession] = useState({
    phone: "",
    sentAt: null,
    verified: false,
  });

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const [getUser] = useLazyQuery(GET_USER_BY_PHONE);
  const [createUser] = useMutation(CREATE_USER);
  const [publishUser] = useMutation(PUBLISH_USER);

  const router = useRouter();

  const { checkAuth } = useAuth();

  const lockRef = useRef(false);

  const timer = otpSession.sentAt
    ? Math.max(
        0,
        OTP_EXPIRE_TIME - Math.floor((currentTime - otpSession.sentAt) / 1000),
      )
    : 0;

  const canResend = timer === 0;

  const showNotification = (message, type = "success", code = null) => {
    setNotification({ message, type, code });
  };

  useEffect(() => {
    if (step !== 2 || !otpSession.sentAt) return;

    // sync فوری زمان
    setCurrentTime(Date.now());

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [step, otpSession.sentAt]);

  const handleSendOtp = async () => {
    if (lockRef.current) return;

    setError("");

    const phoneError = validatePhone(phone);

    if (phoneError) {
      setError(phoneError);
      return;
    }

    if (otpSession.phone === phone && otpSession.verified) {
      setStep(3);
      return;
    }

    if (isOtpStillValid(otpSession, phone)) {
      setStep(2);
      return;
    }

    lockRef.current = true;
    setLoading(true);
    try {
      const result = await sendOtp(phone);

      setOtpSession({
        phone,
        sentAt: Date.now(),
        verified: false,
      });

      setStep(2);
      setCurrentTime(Date.now());
      setOtp("");
      showNotification("🔐 Demo Verification Code", "success", result.demoOtp);
    } catch {
      setError("Network error. Try again.");
    } finally {
      lockRef.current = false;
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || lockRef.current) return;
    setError("");
    lockRef.current = true;
    setLoading(true);

    try {
      const result = await sendOtp(phone);

      setOtpSession({
        phone,
        sentAt: Date.now(),
        verified: false,
      });
      setCurrentTime(Date.now());
      setOtp("");

      showNotification("🔐 Demo Verification Code", "success", result.demoOtp);
    } catch {
      showNotification("Could not resend code", "error");
    } finally {
      lockRef.current = false;
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    if (lockRef.current) return;

    if (otpSession.phone === phone && otpSession.verified) {
      setStep(3);
      return;
    }

    lockRef.current = true;
    setLoading(true);
    try {
      await verifyOtp(phone, otp);

      setOtpSession({
        phone,
        sentAt: otpSession.sentAt,
        verified: true,
      });

      const result = await getUser({
        variables: { phone },
      });

      const users = result.data?.peoples || [];

      if (users.length > 0) {
        await createSession(phone, users[0].id);

        router.replace(router.asPath);

        showNotification(
          `Welcome back ${users[0].firstName || ""}! 🎉`,
          "success",
        );

        setTimeout(() => onClose?.(false), 1500);
        await checkAuth();
      } else {
        setStep(3);
      }
    } catch (err) {
      console.error(err);
      setError("The verification code is incorrect or has expired.");
    } finally {
      lockRef.current = false;
      setLoading(false);
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);

    if (otpSession.phone && otpSession.phone !== value) {
      setOtpSession({
        phone: "",
        sentAt: null,
        verified: false,
      });

      setOtp("");
    }
  };

  const handleRegister = async () => {
    if (lockRef.current) return;

    const registerError = validateRegister(firstName, lastName);

    if (registerError) {
      setError(registerError);
      return;
    }

    lockRef.current = true;
    setLoading(true);
    try {
      const result = await createUser({
        variables: {
          phone,
          firstName,
          lastName,
        },
      });

      const id = result.data?.createPeople?.id;

      await publishUser({
        variables: { id },
      });

      await createSession(phone, id);

      showNotification(
        `Welcome ${result.data.createPeople.firstName}! 🎉`,
        "success",
      );

      setTimeout(() => onClose?.(false), 1500);
      await checkAuth();
    } catch (err) {
      console.error(err);
      showNotification("Network error.", "error");
    } finally {
      lockRef.current = false;
      setLoading(false);
    }
  };

  return {
    step,
    setStep,

    loading,

    phone,
    setPhone,

    otp,
    setOtp,

    firstName,
    setFirstName,

    lastName,
    setLastName,

    error,
    setError,

    notification,
    setNotification,

    otpSession,

    handleSendOtp,
    handleVerifyOtp,
    handlePhoneChange,
    handleRegister,

    timer,
    canResend,
    handleResendOtp,
  };
}

export default useLoginFlow;
