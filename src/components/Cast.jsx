import React, { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { getImageUrl } from "@/util/tmdbImageConstants"
import { placeholderImg } from "@/util/local-ImageConstants"

// main Cast component that renders a list of cast members
const Cast = ({ cast }) => {
  // Slice the cast list to show only the first 10 members
  const CastList = cast?.slice(0, 10) || []

  return (
    <div className="overflow-x-auto pb-4 scrollbar-thin dark:scrollbar-thumb-purple-900 scrollbar-track-gray-900 scrollbar-corner-gray-300 scrollbar-h-px transition-colors duration-300">
      <div className="flex space-x-4">
        {/* Map over the CastList members and render a CastMember for each */}
        {CastList.map((person) => (
          <CastMember key={person.id} person={person} />
        ))}
      </div>
    </div>
  )
}

//-------------------------------------------------------------------------------------

//memo is used to memoize the CastMember component, preventing unnecessary re-renders when the props don't change
const CastMember = React.memo(({ person }) => {
  const [imgSrc, setImgSrc] = useState(
    getImageUrl("PROFILE", "LARGE", person.profile_path),
  )

  // useCallback memoizes the handleImageError function so it doesn't get recreated on every render
  const handleImageError = useCallback(() => setImgSrc(placeholderImg), [])
  return (
    <Link href={`/actors/${person.id}`}>
      <div className="flex-shrink-0 w-32 text-center group">
        <div className="relative overflow-hidden rounded-lg min-h-[192px] min-w-[128px]  ">
          <Image
            // The current image source (initial or fallback)
            src={imgSrc}
            alt={person.name}
            className=" object-cover transition duration-300 group-hover:scale-110 "
            onError={handleImageError}
            fill
            sizes="(max-width: 768px) 100vw, 50vw" />

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center">
            <p className="text-white opacity-0 group-hover:opacity-100 transition duration-300 text-sm">
              {person.character} {/*character's name in the movie/tv show */}
            </p>
          </div>
        </div>
        {/* Display the actor's name below the image */}
        <p className="mt-2 font-semibold text-sm">{person.name}</p>
      </div>
    </Link>
  );
})

// Add a display name for the memoized component to assist with debugging
CastMember.displayName = "CastMember"

export default Cast
