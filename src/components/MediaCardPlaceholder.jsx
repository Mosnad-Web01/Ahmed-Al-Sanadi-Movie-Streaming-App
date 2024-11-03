const MediaCardPlaceholder = () => {
  return (
    <div className="inline-flex flex-col justify-end px-1 rounded-b-2xl py-4 mt-[28px] mx-4 w-48 h-[400px] cursor-pointer animate-pulse transform transition-transform hover:scale-105">
      {/* Placeholder for the image */}
      <div className="relative">
        <div className="relative overflow-hidden aspect-[2/3] w-full">
          <div className="bg-gray-300 rounded-2xl w-full h-full shimmer"></div>
        </div>
        
        {/* Placeholder for the circular progress bar */}
        <div className="absolute bottom-2 left-2 z-30">
          <div className="w-14 h-14 rounded-full bg-gray-300 shimmer"></div>
        </div>
      </div>
      
      {/* Placeholder for the content */}
      <div className="px-4 flex-grow mt-1">
        <div className="flex flex-col">
          {/* Placeholder for the title */}
          <div className="bg-gray-300 h-5 w-3/4 mt-2 rounded shimmer"></div>

          {/* Placeholder for release date */}
          <div className="bg-gray-300 h-4 w-1/2 mt-2 rounded shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default MediaCardPlaceholder;