import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function FilterDropdown({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);

  const toggleOption = (value) => {
    const set = new Set(selected);
    set.has(value) ? set.delete(value) : set.add(value);
    onChange([...set]);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-100"
      >
        {label}
        <ChevronDownIcon className="w-4 h-4 text-gray-600" />
      </button>

      {open && (
        <div className="absolute top-10 left-0 bg-white border shadow-lg rounded-md p-2 w-40 z-50">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm py-1">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggleOption(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
