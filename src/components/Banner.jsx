
// React and Next.js imports
import React, { useState } from 'react';
import Image from "next/image";


// Components
import StarRating from "./StarRating"

// Importing the image constants
import { getImageUrl } from "@/util/tmdbImageConstants" 
import {banner_placeholder} from "@/util/local-ImageConstants"


const Banner = ({
  path,
  title,
  tagline,
  releaseDate,
  seasonsCount,
  vote_average,
  runtime,
}) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl("BACKDROP", "ORIGINAL", path));
  return (
    <div className="relative h-96 md:h-[80vh]">
      <Image
        src={imgSrc}
        alt={title}
        onError={() => setImgSrc(banner_placeholder)}
        priority
        className="opacity-100 dark:opacity-50 object-cover"
        fill
        sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-200 dark:from-gray-900 to-transparent transition-colors duration-300"></div>
      <div className="absolute bottom-0 left-0 p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        {tagline && <p className="text-xl mb-2">{tagline}</p>}
        <div className="flex items-center space-x-2  md:space-x-4 text-sm">
          {releaseDate && <span>{releaseDate.split("-")[0]}</span>}{" "}
          {/* Check if releaseDate exists */}
          <span>•</span>
          <span className=""> {runtime}</span>
          <span>•</span>
          <StarRating
            rating={vote_average}
            attr="text-gray-800 dark:text-yellow-400 transition-colors duration-300"
            size="h-5 w-5"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner
