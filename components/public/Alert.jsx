import { FiAlertCircle } from "react-icons/fi";

function Alert({ message }) {
  if (!message) return null;

  return (
    <div className="mb-5 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">
      <FiAlertCircle />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default Alert;
