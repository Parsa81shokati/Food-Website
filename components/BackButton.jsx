import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#9e0910] 
                 text-gray-700 hover:text-white rounded-full shadow-md hover:shadow-xl 
                 transition-all duration-300 border border-gray-200 hover:border-[#9e0910]"
    >
      <IoArrowBack
        size={18}
        className="group-hover:-translate-x-1 transition-transform"
      />
      <span className="text-sm font-medium">Back to Menu</span>
    </button>
  );
}
