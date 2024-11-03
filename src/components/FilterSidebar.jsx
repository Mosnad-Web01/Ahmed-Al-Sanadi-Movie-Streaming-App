"use client"
import React, { useEffect, useState } from "react"
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB"

const FilterSidebar = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [sortOrder, setSortOrder] = useState("popularity.desc")

  // Fetch genres from TMDB on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      const genreData = await fetchDataFromTMDB("/genre/movie/list")
      if (genreData && genreData.genres) {
        setGenres(genreData.genres)
      }
    }

    fetchGenres()
  }, [])

  // Handle genre checkbox changes
  const handleGenreChange = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId]

    setSelectedGenres(updatedGenres)
    onFilterChange(updatedGenres, sortOrder) // Notify parent component of change
  }

  // Handle sort order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value)
    onFilterChange(selectedGenres, e.target.value) // Notify parent component of change
  }

  return (
    <div className="space-y-6">
      {/* Genre Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Genres
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-300"
            >
              <input
                type="checkbox"
                value={genre.id}
                onChange={() => handleGenreChange(genre.id)}
                checked={selectedGenres.includes(genre.id)}
                className="mr-2"
              />
              {genre.name}
            </label>
          ))}
        </div>
      </div>

      {/* Sort Order Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Sort By
        </h3>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="block w-full p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="release_date.desc">Newest</option>
          <option value="vote_average.desc">Highest Rated</option>
          <option value="vote_count.desc">Most Voted</option>
        </select>
      </div>
    </div>
  )
}

export default FilterSidebar
