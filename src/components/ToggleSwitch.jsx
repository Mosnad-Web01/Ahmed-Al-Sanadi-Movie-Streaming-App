import React, { useState } from "react";

const ToggleSwitch = ({ options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="toggle-switch">
      {/* Desktop version with enhanced gradients */}
      <div className="hidden sm:inline-flex items-center gap-4">
        <div className="bg-gray-200/80 backdrop-blur-sm p-1 rounded-full flex items-center shadow-lg dark:bg-gray-800/30">
          {options.map((option) => (
            <button
              key={option.value}
              className={`py-1.5 px-5 rounded-full transition-all duration-500 font-medium text-sm relative z-10 overflow-hidden ${
                selectedOption === option.value
                  ? "text-white shadow-xl" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`}
              onClick={() => onChange(option.value)}
              style={{
                background: selectedOption === option.value 
                  ? "linear-gradient(135deg, rgba(1,180,228,1) 0%, rgba(144,206,161,1) 100%)" 
                  : "transparent",
                boxShadow: selectedOption === option.value 
                  ? "0 4px 15px rgba(1,180,228,0.3)" 
                  : "none"
              }}
            >
              <span className="relative z-10">{option.label}</span>
              {selectedOption === option.value && (
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-md z-0"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile dropdown with enhanced styling */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center w-full rounded-full shadow-lg px-5 py-2.5 text-sm font-medium text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(3,37,65,1) 0%, rgba(1,180,228,1) 100%)",
          }}
        >
          <span className="relative z-10">
            {options.find(option => option.value === selectedOption)?.label}
          </span>
          <svg
            className="-mr-1 ml-2 h-5 w-5 relative z-10 transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
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
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-sm"></span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm animate-fadeIn">
            <div className="p-0.5 bg-gradient-to-br from-[#01b4e4] via-[#90cea1] to-[#01b4e4]">
              <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                {options.map((option) => (
                  <button
                    key={option.value}
                    className={`block w-full text-left px-4 py-3 text-sm transition-all duration-300 ${
                      selectedOption === option.value
                        ? "bg-gradient-to-r from-[#01b4e4]/20 to-[#90cea1]/20 text-[#032541] dark:text-white font-medium"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleSwitch;