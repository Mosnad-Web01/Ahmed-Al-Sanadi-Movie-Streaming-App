import React from 'react'

const Seasons = ({seasons}) => {
  return (
   <div className="space-y-4 max-h-[500px] overflow-y-auto px-2 scrollbar-thin dark:scrollbar-thumb-gray-800 scrollbar-track-gray-900 scrollbar-corner-gray-300 scrollbar-h-2.5">
    {seasons?.map((season) => (
      <div
        key={season.id}
        className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition duration-300"
      >
        <h2 className="font-semibold text-lg">{season.name}</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          {season.overview}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Episodes: {season.episode_count}
        </p>
      </div>
    ))}
  </div>
  )
}

export default Seasons