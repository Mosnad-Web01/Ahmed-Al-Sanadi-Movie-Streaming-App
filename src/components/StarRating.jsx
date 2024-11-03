// Component to display star rating
const StarRating = ({ rating, attr ="text-yellow-400" , size="h-4 w-4" }) => {
    const stars = Math.round(rating / 2);
    return (
      <div className="flex items-center justify-center">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            className={`${size} ${index < stars ? "text-yellow-500" : "text-gray-500"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 15l-5.878 3.09 1.121-6.54L0 6.09l6.545-.955L10 0l2.455 5.136L20 6.09l-5.243 5.46 1.121 6.54z" />
          </svg>
        ))}
        <span className = {`ml-3 text-lg font-custom font-extrabold ${attr}`}> {rating.toFixed(1)} / 10</span>
      </div>
    );
  };
  export default StarRating;