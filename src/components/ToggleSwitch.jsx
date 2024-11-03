import React, { useState } from "react";

const ToggleSwitch = ({ options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="toggle-switch">
      {/* Original design for larger screens */}
      <div className="hidden sm:inline-flex items-center gap-4">
        <div className="bg-gray-300 rounded-full flex items-center">
          {options.map((option) => (
            <button
              key={option.value}
              className={`py-1 px-4 rounded-full transition-all duration-700 ${
                selectedOption === option.value
                  ? "bg-[#032541] text-white"
                  : "text-gray-600"
              }`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown for small screens with gradient background */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center w-full rounded-full bg-gradient-to-b from-[#032541] to-[#01b4e4] px-4 py-2 text-sm font-medium text-white"
        >
          {options.find(option => option.value === selectedOption)?.label}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-gradient-to-b from-[#01b4e4] to-[#90cea1] rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedOption === option.value
                    ? "bg-white bg-opacity-20 text-white"
                    : "text-[#032541] hover:bg-white hover:bg-opacity-10"
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleSwitch;