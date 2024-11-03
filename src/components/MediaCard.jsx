import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { placeholderImg } from "@/util/local-ImageConstants"

const MediaCard = ({
  imageUrl,
  title,
  voteAverage,
  releaseDate,
  link,
  mediaType,
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl)
  return (
    <Link href={link}>
      <div className="inline-flex flex-col justify-end px-1 rounded-b-2xl py-4 mt-[28px]  mx-4 w-48 transform transition-transform hover:scale-105 hover:shadow-stone-950 h-[400px] cursor-pointer ">
        <div className="relative">
          <div className="relative overflow-hidden aspect-[2/3] w-full ">
            <Image
              src={imgSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              placeholder = "blur"
              blurDataURL="/placeholder-img.jpg"
              onError={() => setImgSrc(placeholderImg)}
              className="object-cover rounded-2xl w-full"
            />
          </div>

          {/* Circular Progress Bar (Only for movies and TV shows) */}
          {mediaType !== "person" && voteAverage >= 0 && (
            <div className="absolute bottom-2 left-2 z-30">
              <div
                className="circle-progress w-14 h-14 text-gray-200"
                role="progressbar"
                style={{ "--progress": voteAverage * 10 }}
              >
                <div className="inner">
                  {Math.round(voteAverage * 10)}
                  <span>%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 flex-grow mt-1"> 
          <div className="flex flex-col">
                      {/* Title */}
          <h3
            className="text-lg font-semibold mt-2 dark:text-white text-left break-words line-clamp-1 "
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {title}
          </h3>

          {/* Release Date (Only for movies and TV shows) */}
          {mediaType !== "person" && (
            <p className="text-gray-400 text-left block text-lg font-thin">
              {releaseDate
                ? new Date(releaseDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Unknown"}
            </p>
          )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MediaCard
