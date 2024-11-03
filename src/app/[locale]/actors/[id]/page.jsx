"use client"
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa" // Import social media icons
import { useEffect, useState } from "react"
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB"
import Image from "next/image"
import Link from "next/link"
import LoadingSpinner from "@/components/LoadingSpinner"

import { getImageUrl } from "@/util/tmdbImageConstants"
import InteractiveButtons from "@/components/InteractiveButtons"

const ActorPage = ({ params }) => {
  const { id } = params
  const [actor, setActor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showFullBiography, setShowFullBiography] = useState(false)

  useEffect(() => {
    const getActorDetails = async () => {
      try {
        const data = await fetchDataFromTMDB(
          `/person/${id}?append_to_response=movie_credits,external_ids`,
        )
        console.log("Actor External IDs:", data.external_ids) // Logging external_ids for debugging
        setActor(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching actor details:", error)
        setLoading(false)
      }
    }
    getActorDetails()
  }, [id])

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  if (!actor) {
    return <div>Actor not found</div>
  }

  const biography = actor.biography || "Biography not available."
  const isBiographyLong = biography.length > 500
  const displayedBiography = showFullBiography
    ? biography
    : biography.slice(0, 500)

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Actor Image */}
      <div className="flex-shrink-0">
        <Image
          src={`${getImageUrl("PROFILE", "XXLARGE", actor.profile_path)}`}
          alt={actor.name}
          width={300}
          height={450}
          className="rounded-lg shadow-lg"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>

      {/* Actor Info */}
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-4">{actor.name}</h1>

        {/* Biography */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Biography</h2>
          <p className="text-lg">
            {displayedBiography}
            {isBiographyLong && !showFullBiography && "…"}
          </p>
          {isBiographyLong && (
            <button
              onClick={() => setShowFullBiography(!showFullBiography)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              {showFullBiography ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Personal Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Personal Info</h2>
          <p>
            <strong>Birthday:</strong> {actor.birthday}
          </p>
          <p>
            <strong>Gender:</strong> {actor.gender === 1 ? "Female" : "Male"}
          </p>
          <p>
            <strong>Known Credits:</strong> {actor.movie_credits.cast.length}
          </p>
        </div>

        <InteractiveButtons mediaId={actor.id} mediaType="person"/>


        {/* Social Media Links */}
        {actor.external_ids && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Follow on Social Media
            </h2>
            <div className="flex items-center gap-4">
              {actor.external_ids.instagram_id ? (
                <a
                  href={`https://instagram.com/${actor.external_ids.instagram_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <FaInstagram size={20} />
                  Instagram
                </a>
              ) : (
                <p className="text-gray-500">Instagram link not available</p>
              )}

              {actor.external_ids.twitter_id ? (
                <a
                  href={`https://twitter.com/${actor.external_ids.twitter_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <FaTwitter size={20} />
                  Twitter
                </a>
              ) : (
                <p className="text-gray-500">Twitter link not available</p>
              )}

              {actor.external_ids.facebook_id ? (
                <a
                  href={`https://facebook.com/${actor.external_ids.facebook_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <FaFacebook size={20} />
                  Facebook
                </a>
              ) : (
                <p className="text-gray-500">Facebook link not available</p>
              )}
            </div>
          </div>
        )}

        {/* Known For */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Known For</h2>
          <div className="flex overflow-x-auto scroll-m-1 space-x-4">
            {actor.movie_credits?.cast.slice(0, 6).map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-40">
                <Link href={`/movie/${movie.id}`} passHref>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={160}
                    height={240}
                    className="rounded-lg shadow-md"
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                  <p className="text-center mt-2 text-sm font-medium">
                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActorPage
