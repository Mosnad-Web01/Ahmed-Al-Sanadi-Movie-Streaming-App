import React, { useState } from 'react';
import StarRating from './StarRating';
import InteractiveButtons from './InteractiveButtons';

const MediaOverview = ({
  activeTab,
  media,
  mediaType,
  releaseDate,
  runtime,
  seasonsCount,
}) => {
  const [showFullOverview, setShowFullOverview] = useState(false)

  if (activeTab !== 'overview') {
    return null;
  }
  return (
    <div>
      {/* Star Rating */}
      <div className="flex justify-start">
        <StarRating
          rating={media.vote_average}
          attr="text-gray-800 dark:text-yellow-400 transition-colors duration-300"
          size="h-5 w-5"
        />
      </div>

      {/* Media Overview */}
      <p className={`text-gray-700 dark:text-gray-300 transition-colors duration-300 ${showFullOverview ? '' : 'line-clamp-4'}`}>
        {media.overview}
      </p>
      {media.overview.length > 280 && (
        <button
          className="text-blue-600 dark:text-blue-400 hover:underline mt-2 transition-colors duration-300"
          onClick={() => setShowFullOverview(!showFullOverview)}
        >
          {showFullOverview ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Interactive Buttons */}
      <InteractiveButtons mediaId={media.id} mediaType={mediaType}/>

      {/* Additional Information */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* Rating */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Rating</h3>
          <div className="flex gap-4 mt-4 z-30">
            <div
              className="circle-progress w-16 h-16 text-gray-200"
              role="progressbar"
              style={{ '--progress': media.vote_average * 10 }}
            >
              <div className="inner">
                {Math.round(media.vote_average * 10)}
                <span>x</span>
              </div>
            </div>
            <h3 className="mt-6">{media.vote_count} People votes</h3>
          </div>
        </div>

        {/* Genres */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {media.genres.map((genre) => (
              <button
                key={genre.id}
                className="px-3 py-1 mt-4 rounded-full text-sm font-medium text-white bg-gradient-to-r from-gray-500 to-gray-900 hover:from-gray-600 hover:to-black dark:from-orange-500 dark:to-purple-900 dark:hover:from-orange-600 dark:hover:to-purple-800 transition duration-300 ease-in-out transform hover:scale-105"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-lg transition duration-500 hover:scale-105 cursor-pointer ">
          <p className="font-semibold">Rating:</p>
          <p>{media.vote_average.toFixed(1)} / 10</p>
        </div>

        <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-lg transition duration-500 hover:scale-105 cursor-pointer">
          <p className="font-semibold">
            {mediaType === 'movie' ? 'Release Date:' : 'First Air Date:'}
          </p>
          <p>{new Date(releaseDate).toLocaleDateString()}</p>
        </div>

        <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-lg transition duration-500 hover:scale-105 cursor-pointer">
          <p className="font-semibold">
            {mediaType === 'movie' ? 'Runtime:' : 'Episode Runtime:'}
          </p>
          <p>{runtime}</p>
        </div>

        {mediaType === 'tv' && (
          <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-lg transition duration-500 hover:scale-105 cursor-pointer">
            <p className="font-semibold">Number of Seasons:</p>
            <p>{seasonsCount}</p>
          </div>
        )}

        <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-lg transition duration-500 hover:scale-105 cursor-pointer">
          <p className="font-semibold">Popularity:</p>
          <p>{media.popularity.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default MediaOverview;
