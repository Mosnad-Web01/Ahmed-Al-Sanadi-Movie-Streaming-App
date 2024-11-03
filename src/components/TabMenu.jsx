import React from "react";

const TabMenu = ({ activeTab, setActiveTab, mediaType }) => {
  const defaultStyles = "px-4 py-2 font-semibold text-sm transition duration-300 transform hover:scale-105 focus:outline-none  focus:ring-opacity-50 shadow-lg";
  
  const tabStyles = {
    active: "bg-gradient-to-r from-purple-600 to-pink-500 text-white focus:ring-pink-500",
    inactive: "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-200 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700 "
  };

  const getButtonClass = (tabName) =>
    `${defaultStyles} ${activeTab === tabName ? tabStyles.active : tabStyles.inactive}`;

  const tabData = [
    { name: "overview", label: "Overview", icon: "📖" },
    { name: "cast", label: "Cast", icon: "🎭" },
    { name: "seasons", label: "Seasons", icon: "📺", showFor: "tv" },
    { name: "reviews", label: "Reviews", icon: "⭐" },
    { name: "details", label: "Details", icon: "  " },
  ];

  return (
    <div className="flex flex-wrap  gap-4 mb-6">
      {tabData.map((tab) => (
        (tab.showFor === undefined || tab.showFor === mediaType) && (
          <button
            key={tab.name}
            className={getButtonClass(tab.name)}
            onClick={() => setActiveTab(tab.name)}
          >

            {tab.label}
          </button>
        )
      ))}
    </div>
  );
};

export default TabMenu;