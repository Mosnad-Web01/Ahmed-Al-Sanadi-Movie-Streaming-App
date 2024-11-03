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


/**
 * A reusable component for displaying a section of media (e.g., movies, TV shows) with a toggle switch for selecting the category.
 *
 * @param {string} title The title to display for the section.
 * @param {Array} toggleOptions An array of strings representing the options for the toggle switch.
 * @param {function} endpoint A function that takes a category and returns the API endpoint for fetching media.
 * @param {string} initialCategory The initial category to select.
 *
 * @returns {React.ReactElement} A React component for rendering the media section.
 */

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
    <div className="container mx-auto font-custom px-4">
      <div className="media-section">
        {/* Title and Toggle Switch */}
        <div className="toggle-switch flex items-center gap-4 mb-2">
          <h2 className="text-2xl font-bold pl-4">{title}</h2>
          <ToggleSwitch
            options={toggleOptions}
            selectedOption={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {/* media content  */}
        {loading ? (
          <HorizontalSlider>
            {[...Array(8)].map((_, index) => (
              <MediaCardPlaceholder key={index} /> //skeleton media card
            ))}
          </HorizontalSlider>
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
          <p>No media available.</p>
        )}

        {/* error message */}
        {error && <p className="text-red-500">Failed to load media: {error}</p>}
      </div>
    </div>
  )
}

export default MediaSection