"use client"

// react and next.js imports
import React, { useState, useEffect, useCallback } from "react"

// component imports
import ToggleSwitch from "./ToggleSwitch"
import MediaCard from "./MediaCard"
import MediaCardPlaceholder from "./MediaCardPlaceholder"
import HorizontalSlider from "./HorizontalSlider"

// util & service imports
import { getImageUrl } from "@/util/tmdbImageConstants"
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB"
import {
  getMediaLink,
  getMediaTitle,
  getMediaReleaseDate,
} from "../services/mediaServices"

const MediaSection = ({ title, toggleOptions, endpoint, initialCategory }) => {
  //state for the selected category (e.g., "day" or "week" for trending|| or "streaming" , "on_tv", for Popular)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  const [state, setState] = useState({
    media: [],
    loading: true,
    error: null,
  })

  // fetch media data when the category changes
  useEffect(() => {
    const fetchMedia = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      try {
        const data = await fetchDataFromTMDB(endpoint(selectedCategory))
        setState((prev) => ({ ...prev, media: data.results, loading: false }))
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Failed to load media",
          loading: false,
        }))
      }
    }
    fetchMedia()
  }, [endpoint, selectedCategory])

  // a callback for handling category change
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category)
  }, [])

  const { media, loading, error } = state

  return (
    <div className="container mx-auto font-custom px-4 relative">
      {/* Section Gradient Border */}

      
      <div className="media-section py-6 relative">
        {/* Title and Toggle Switch with enhanced styling */}
        <div className="toggle-switch flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 pl-2">
          <h2 className="text-2xl font-bold relative inline-block">
            {title}
            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#01b4e4] to-[#90cea1]"></span>
          </h2>
          <ToggleSwitch
            options={toggleOptions}
            selectedOption={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {/* media content with enhanced styling */}
        {loading ? (
          <div className="relative">
            <HorizontalSlider>
              {[...Array(8)].map((_, index) => (
                <MediaCardPlaceholder key={index} /> //skeleton media card
              ))}
            </HorizontalSlider>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-[#01b4e4] border-r-[#90cea1] border-b-[#01b4e4] border-l-[#90cea1] border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        ) : media && media.length > 0 ? (
          <HorizontalSlider>
            {media.map((item) => (
              <MediaCard
                key={item.id}
                imageUrl={getImageUrl("POSTER", "w500", item.poster_path)}
                title={getMediaTitle(item)}
                voteAverage={item.vote_average}
                releaseDate={getMediaReleaseDate(item)}
                link={getMediaLink(item)}
              />
            ))}
          </HorizontalSlider>
        ) : (
          //if no media is available
          <div className="flex flex-col items-center justify-center p-10 rounded-xl bg-gradient-to-br from-gray-200/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
            </svg>
            <p className="text-gray-600 dark:text-gray-300">No media available.</p>
          </div>
        )}

        {/* error message with enhanced styling */}
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20">
            <p className="text-red-500 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Failed to load media: {error}
            </p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[#01b4e4]/50 to-transparent"></div>
    </div>
  )
}

export default MediaSection