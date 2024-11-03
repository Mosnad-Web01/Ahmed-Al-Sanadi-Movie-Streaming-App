"use client"

//react & nextimports
  import { useState, useEffect } from "react"
  import Image from "next/image"
  import Link from "next/link"

//components imports
  import { fetchPopularActors } from "@/services/fetchActors"
  import LoadingSpinner from "@/components/LoadingSpinner"

// Import default images URLs from constants
import { defaultMaleImg ,defaultFemaleImg , defaultUnknownImg } from '@/util/local-ImageConstants'; 

// util imports
import {getImageUrl} from '@/util/tmdbImageConstants'

// ActorImage Component as before
const ActorImage = ({ profilePath, gender, name }) => {
  const [imageSrc, setImageSrc] = useState(getDefaultImage(gender))

  const handleLoadingComplete = () => {
    if (profilePath) {
      setImageSrc(getImageUrl("PROFILE","XLARGE", profilePath))
    }
  }

  return (
    <Image
      src={imageSrc}
      alt={name}
      width={200}
      height={300}
      className="w-full h-auto rounded-lg"
      onLoadingComplete={handleLoadingComplete}
      onError={(e) => {
        e.target.onerror = null
        setImageSrc(getDefaultImage(gender))
      }}
      style={{
        maxWidth: "100%",
        height: "auto"
      }} />
  );
}

// Helper function for determining the default image based on gender
const getDefaultImage = (gender) => {
  if (gender === 1) return defaultFemaleImg
  if (gender === 2) return defaultMaleImg
  return defaultUnknownImg
}
const PopularActors = () => {
  const [actors, setActors] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1) // Current page state
  const [totalPages, setTotalPages] = useState(1) // Total number of pages

  useEffect(() => {
    const getActors = async () => {
      setLoading(true)
      const data = await fetchPopularActors(page)
      setActors(data.results) // Update the state with fetched actors
      setTotalPages(data.total_pages) // Set the total pages from API response
      setLoading(false)
    }
    getActors()
  }, [page]) // Re-fetch data whenever `page` changes

  // Function to determine default image based on gender
  const getDefaultImage = (gender) => {
    if (gender === 1) return defaultFemaleImg
    if (gender === 2) return defaultMaleImg
    return defaultUnknownImg
  }

  // Handle pagination controls
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-6xl font-bold mb-6 text-center">Popular Actors</h1>

      {/* Actor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {actors.map((actor) => (
          <Link href={`/actors/${actor.id}`} key={actor.id}>
            <div key={actor.id} className="actor-card p-4 shadow-lg">
              <ActorImage
                profilePath={actor.profile_path}
                gender={actor.gender}
                name={actor.name}
              />
              <h2 className="mt-2 text-xl font-semibold text-center">
                {actor.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md bg-blue-500 text-white ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice(Math.max(page - 3, 0), Math.min(page + 2, totalPages))
          .map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-1 rounded-md ${pageNumber === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
            >
              {pageNumber}
            </button>
          ))}

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md bg-blue-500 text-white ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PopularActors
