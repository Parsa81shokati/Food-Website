import { useState } from "react";
import { MdSort } from "react-icons/md";
import { FaSortUp, FaSortDown } from "react-icons/fa";

export default function Filters({ options = [], onSortChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const handleSelect = (option) => {
    setActive(option);
    setOpen(false);
    onSortChange({
      field: option.field,
      direction: option.direction,
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="
          flex items-center gap-2 px-5 py-3
          bg-white border border-gray-200
          rounded-full shadow-sm
          hover:border-[#9e0910] hover:text-[#9e0910]
          transition
        "
      >
        <MdSort className="text-[#9e0910]/70" />
        <span className="text-sm font-medium">
          {active ? active.label : "Sort"}
        </span>
        {active &&
          (active.direction === "asc" ? (
            <FaSortUp className="text-[#9e0910] text-xs" />
          ) : (
            <FaSortDown className="text-[#9e0910] text-xs" />
          ))}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl p-2">
            <p className="text-xs text-gray-400 px-3 py-2 font-semibold">
              SORT BY
            </p>

            {options.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSelect(option)}
                className={`
                  w-full text-left px-4 py-2 rounded-xl text-sm transition
                  ${
                    active?.key === option.key
                      ? "bg-[#9e0910]/10 text-[#9e0910] font-medium"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {active?.key === option.key && "✓"}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
