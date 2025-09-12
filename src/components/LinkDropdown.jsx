import { useState, useEffect } from "react"
import Link from "next/link"

const LinkDropdown = ({ label, dropdownItems, href, dropdownItemshref }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [expanded, setExpanded] = useState(false)
  let dropdownTimeout

  // Function to show dropdown with delay on hover leave
  const handleMouseEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout)
    setShowDropdown(true)
  }

  // Function to hide dropdown with a delay
  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => setShowDropdown(false), 200)
  }

  // Cleanup the timeout
  useEffect(() => {
    return () => clearTimeout(dropdownTimeout)
  }, [])

  // Show only the first 6 items by default
  const displayedItems = expanded ? dropdownItems : dropdownItems.slice(0, 6)

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href="#"
        className="hover:text-[#01b4e4] flex items-center  text-lg font-semibold"
      >
        {label}
        <span
          className={`ml-2 transform transition-transform duration-500 ${
            showDropdown ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </a>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 max-h-60 overflow-hidden z-10">
          {/* Arrow */}
          <div className="relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-700 dark:border-b-white"></div>
          </div>

          {/* Dropdown Content */}
          <div className="bg-gray-800 dark:bg-white dark:text-black text-gray-200 rounded-md shadow-lg p-4 overflow-y-auto max-h-60 transition-colors duration-500">
            <ul className="grid grid-cols-2 gap-2">
              {displayedItems?.map((item, idx) => (
                <li
                  key={idx}
                  className="px-2 py-1 hover:text-[#01b4e4] cursor-pointer transition-colors duration-300"
                >
                  <Link
                    href={`/${href}/${item.toLowerCase().replace(/ /g, "-")}`}
                    prefetch={true}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* See More / Collapse Button */}
            {dropdownItems.length > 6 && (
              <button
                className="w-full text-center mt-2 text-sm text-[#01b4e4] hover:underline"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show Less" : "See More"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkDropdown
