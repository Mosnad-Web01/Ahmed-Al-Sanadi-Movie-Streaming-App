import React, { useState } from 'react';

const ReviewSection = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [expanded, setExpanded] = useState(false);

  const showMoreReviews = () => {
    if (expanded) {
      setVisibleReviews(2);
      setExpanded(false);
    } else {
      setVisibleReviews(reviews.results.length);
      setExpanded(true);
    }
  };

  return (
    <div className="space-y-6 mt-8">
      {reviews && reviews.results.length > 0 ? (
        <>
          <div className="space-y-6 transition-all duration-500 ease-in-out">
            {reviews.results.slice(0, visibleReviews).map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                      {review.author}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-4">
                  {review.content}
                </p>
                <button
                  className="mt-4 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition duration-300"
                  onClick={() => {/* Implement full review view */}}
                >
                  Read full review
                </button>
              </div>
            ))}
          </div>
          {reviews.results.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={showMoreReviews}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {expanded ? (
                  <>
                    Show Less
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                ) : (
                  <>
                    Show More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No reviews available.
        </p>
      )}
    </div>
  );
}
export default ReviewSection;