"use client"

//react imports
import React, { useState, useEffect } from "react"

// components imports
import Pagination from "./Pagination"
import MediaCard from "./MediaCard"
import LoadingSpinner from "./LoadingSpinner"

//utils and services imports
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB"
import { getImageUrl } from "@/util/tmdbImageConstants"

const SearchResults = ({ query }) => {
  const q = query
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (q) {
      fetchSearchResults()
    }
  }, [q, currentPage]) // fetch results whenever query or currentPage changes

  const fetchSearchResults = async () => {
    setIsLoading(true)
    try {
      const data = await fetchDataFromTMDB(
        `/search/multi?query=${encodeURIComponent(q)}&page=${currentPage}`,
      )
      setResults(data.results)
      setTotalPages(data.total_pages) // set total pages from the API response
    } catch (error) {
      console.error("Error fetching search results:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page) // update current page when pagination changes
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Search Results for{" "}
          <span className="text-blue-500">&quot;{q}&quot;</span>
        </h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className=" container mx-auto flex flex-wrap justify-center md:justify-center">
              {results.map((item) => {
                const mediaType =
                  item.media_type === "person" ? "actors" : item.media_type

                const imageUrl = getImageUrl(
                  "POSTER",
                  "w500",
                  item.poster_path || item.profile_path,
                )
                const title = item.title || item.name
                const releaseDate =
                  item.release_date || item.first_air_date || null
                const link = `/${mediaType}/${item.id}`
                const voteAverage = item.vote_average

                return (
                  <MediaCard
                    key={item.id}
                    imageUrl={imageUrl}
                    title={title}
                    voteAverage={voteAverage}
                    releaseDate={releaseDate}
                    link={link}
                    mediaType={mediaType}
                  />
                )
              })}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResults
