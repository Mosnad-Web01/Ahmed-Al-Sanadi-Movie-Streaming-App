import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";

const ProfileDropdown = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Destructuring the values from useAuth
  const { currentUser, logout } = useAuth(); 

  // Handle logout click
  const handleLogout = async () => {
    try {
      await logout();  // Calls the logout function
      setShowProfileDropdown(false); // Close the dropdown after logging out
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="relative">
      <div
        className="w-6 h-6  flex items-center justify-center rounded-full font-bold cursor-pointer"
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
      >
        {/* Show login link if no user, otherwise show user icon */}
        {!currentUser ? (
          <Link href="/sign-in">
            <div className="flex items-center justify-center gap-1 hover:text-cyan-500">
           
              <FaSignInAlt size={20} />
            </div>
          </Link>
        ) : (
          <FaUser size={20} />
        )}
      </div>

      {/* Dropdown content */}
      {showProfileDropdown && currentUser && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg p-6 font-custom">
          {/* Arrow Indicator */}
          <div className="absolute right-2 -top-1 w-3 h-3 border-l border-b border-white transform rotate-45 bg-white"></div>
          <div className="flex flex-col">
            {/* Display user's name */}
            <span className="font-bold text-sm ">{currentUser?.name || "User"}</span>
            <Link href={`/profile/${currentUser?.uid}`} ><span className="text-sm text-gray-500 cursor-pointer">View profile</span> </Link>
            <div className="border-b border-gray-300 my-2"></div>
            <ul className="space-y-1">
              {/* Menu items */}
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Lists</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Ratings</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Watchlist</li>
              <div className="border-b border-gray-300 my-2"></div>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Edit Profile</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
              {/* Logout */}
              <li
                className="px-4 py-2 hover:bg-red-200 cursor-pointer text-red-500"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
