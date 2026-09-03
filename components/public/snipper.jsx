// components/Spinner.jsx
export default function Spinner({ size = "md", color = "primary" }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const colorClasses = {
    primary: "border-[#9e0910] border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-300 border-t-transparent",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
}
