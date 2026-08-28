import Countdown from "react-countdown";

const CountdownTimer = () => {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // نیمه شب

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) return "00:00:00";
    return (
      <span>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    );
  };

  return <Countdown date={midnight} renderer={renderer} />;
};
export { CountdownTimer };

const filterFoodsByCategory = (foods, category) => {
  if (!category) return foods;
  return foods.filter((food) => food.category === category);
};
export { filterFoodsByCategory };

export const calculateDiscountPrice = (price, discount) => {
  if (!discount || discount <= 0) return price;

  const finalPrice = price * (1 - discount / 100);
  return Number(finalPrice.toFixed(2));
};

export const isOtpStillValid = (otpSession, phone) => {
  if (otpSession.phone !== phone) return false;

  // قبلاً تایید شده
  if (otpSession.verified) {
    return true;
  }

  // هنوز زمان OTP تمام نشده
  if (otpSession.sentAt && Date.now() - otpSession.sentAt < 180000) {
    return true;
  }

  return false;
};
