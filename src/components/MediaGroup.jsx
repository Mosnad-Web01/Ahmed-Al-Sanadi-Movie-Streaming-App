import Link from "next/link";
import Image from "next/image";

const MediaGroup = ({ title, media, mediaType }) => {
  const getLinkPath = (item) => {
    switch (mediaType) {
      case "movie":
        return `/movie/${item.id}`;
      case "tv":
        return `/tv/${item.id}`;
      case "person":
        return `/actors/${item.id}`;
      case "watchLater":
        return item.type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`;
      default:
        return "#";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 p-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="p-6">
        {media.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No {mediaType === "watchLater" ? "items" : `${mediaType}s`} to display.</p>
        ) : (
          <ul className="space-y-4">
            {media.map((item) => (
              <li key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md">
                <Link href={getLinkPath(item)} className="block">
                  <div className="p-4 flex items-center">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.profile_path || item.poster_path}`}
                      alt={item.name || item.title}
                      width={64}
                      height={96}
                      className="w-16 h-24 object-cover rounded-md mr-4 shadow-sm"
                      style={{
                        maxWidth: "100%",
                        height: "auto"
                      }} />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{item.name || item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {mediaType === "person"
                          ? "Actor"
                          : mediaType === "watchLater"
                          ? item.type === "movie" ? "Movie" : "TV Show"
                          : item.release_date || item.first_air_date}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MediaGroup;