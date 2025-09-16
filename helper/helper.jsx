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
