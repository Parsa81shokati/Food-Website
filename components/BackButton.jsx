import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 
                 text-gray-700 rounded-lg transition"
    >
      <IoArrowBack size={18} />
      <span>Back</span>
    </button>
  );
}
