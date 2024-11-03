"use client";
// React and Next.js imports
import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

// Component imports
import StarRating from './StarRating';

// Util imports
import { getImageUrl } from '@/util/tmdbImageConstants';
import { placeholderImg} from '@/util/local-ImageConstants';

const FlipCard = ({ item, mediaType, size, backStyle = 'default' }) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl('POSTER', size, item.poster_path));
  return (
    <Link href={`/${mediaType}/${item.id}`} passHref>
      <div className="flex-shrink-0 w-56 text-center group perspective cursor-pointer">
        <div className="relative w-full h-80 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-1000">
          {/* Front side */}
          <div className="absolute inset-0 rounded-lg overflow-hidden">
          <Image
              src={imgSrc}
              alt={item.title || item.name}
              onError={() => setImgSrc(placeholderImg)}
              fill
              lazy
              sizes="(max-width: 768px) 100vw, 50vw"
              className=" object-fill transition duration-300 group-hover:scale-110"
             />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
          
          {/* Back side */}
          {backStyle === 'default' ? (
            <div className="absolute inset-0 h-full w-full rounded-lg bg-black/80 px-4 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-2">
                {item.title || item.name}
              </h3>
              <p className="text-sm mb-4 line-clamp-3">
                {item.overview}
              </p>
              <div className="flex items-center justify-center space-x-2">
                <StarRating
                  rating={item.vote_average}
                  attr="text-yellow-400"
                  size="h-4 w-4"
                />
                <span className="text-sm">
                  ({item.vote_average.toFixed(1)})
                </span>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-br from-[#022c43] to-[#0a3548] [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
              <div className="p-6 text-left">
                <h2 className="text-3xl font-bold mb-3 text-white">Details</h2>
                <p className="text-base mb-2 text-gray-400">{item.overview.slice(0, 100)}...</p>
                <div className="mb-2">
                  <p className="font-semibold text-yellow-300">Release Date:</p>
                  <p className="text-base text-gray-400 italic">{item.release_date || item.first_air_date}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-yellow-300">Rating:</p>
                  <StarRating rating={item.vote_average} />
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="mt-4 font-semibold text-sm truncate px-2">
          {item.title || item.name}
        </p>
      </div>
    </Link>
  );
};

export default FlipCard;