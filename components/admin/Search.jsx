import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search({ onSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    onSearch(v);
  };

  return (
    <div className="relative w-full md:w-80">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9e0910]/60 text-sm" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search foods..."
        className="
          w-full pl-11 pr-4 py-3
          bg-white
          border border-gray-200
          rounded-full
          text-sm
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-[#9e0910]/30
          focus:border-[#9e0910]
          transition
        "
      />
    </div>
  );
}
