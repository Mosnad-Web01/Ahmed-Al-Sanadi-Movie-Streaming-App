"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

// Components imports
import { fetchPopularActors } from "@/services/fetchActors"
import LoadingSpinner from "@/components/LoadingSpinner"

// Import default images URLs from constants
import { defaultMaleImg, defaultFemaleImg, defaultUnknownImg } from '@/util/local-ImageConstants'

// Util imports
import { getImageUrl } from '@/util/tmdbImageConstants'

// ActorImage Component with CSS-based animations instead of framer-motion
const ActorImage = ({ profilePath, gender, name }) => {
  const [imageSrc, setImageSrc] = useState(getDefaultImage(gender))
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleLoadingComplete = () => {
    if (profilePath) {
      setImageSrc(getImageUrl("PROFILE", "XLARGE", profilePath))
      setImageLoaded(true)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-[2/3] group ">
      {/* Animated gradient background while loading */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>
      
      {/* Glowing effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-pink-500/0 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      
      <Image
        src={imageSrc}
        alt={name}
        fill
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-80'}`}
        onLoadingComplete={handleLoadingComplete}
        onError={(e) => {
          e.target.onerror = null
          setImageSrc(getDefaultImage(gender))
          setImageLoaded(true)
        }}
      />
      
      {/* Gradient overlay at bottom for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
      
      {/* Name overlay with animated reveal on hover */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h2 className="text-xl font-bold text-white drop-shadow-lg line-clamp-2">{name}</h2>
      </div>
    </div>
  )
}

// Helper function for determining the default image based on gender
const getDefaultImage = (gender) => {
  if (gender === 1) return defaultFemaleImg
  if (gender === 2) return defaultMaleImg
  return defaultUnknownImg
}

// Main component
const PopularActors = () => {
  const [actors, setActors] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("popularity.desc")
  const [animatedActors, setAnimatedActors] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    const getActors = async () => {
      setLoading(true)
      const data = await fetchPopularActors(page, selectedFilter)
      setActors(data.results)
      setTotalPages(Math.min(data.total_pages, 100)) // Limit to 100 pages max
      setLoading(false)
      
      // Scroll to top when page changes
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
    getActors()
  }, [page, selectedFilter])

  // Handle animation of actors appearing with staggered delay
  useEffect(() => {
    if (!loading && actors.length > 0) {
      // Reset animated actors
      setAnimatedActors([])
      
      // Add actors one by one with delay to simulate staggered animation
      actors.forEach((actor, index) => {
        setTimeout(() => {
          setAnimatedActors(prev => [...prev, actor.id])
        }, index * 50) // 50ms delay between each actor
      })
    }
  }, [actors, loading])
  
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredActors = actors.filter(actor =>
    actor.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Generate glowing star particles for the background
  const generateStars = (count) => {
    return Array.from({ length: count }).map((_, index) => {
      const size = Math.random() * 4 + 1
      const opacity = Math.random() * 0.5 + 0.3
      const pulseAnimation = `${Math.random() * 3 + 2}s`
      
      return (
        <div
          key={index}
          className="absolute rounded-full bg-white dark:bg-purple-400"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity,
            animation: `pulse ${pulseAnimation} infinite alternate`,
          }}
        />
      )
    })
  }

  // Available sorting options
  const sortingOptions = [
    { value: "popularity.desc", label: "Most Popular" },
    { value: "popularity.asc", label: "Least Popular" },
    { value: "name.asc", label: "Name A-Z" },
    { value: "name.desc", label: "Name Z-A" }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pb-20 relative overflow-hidden" ref={containerRef}>
      {/* Background stars - only visible in dark mode */}
      <div className="hidden dark:block absolute inset-0 overflow-hidden z-0 opacity-70">
        {generateStars(50)}
      </div>
      
      {/* Hero section with gradient backdrop */}
      <div className="relative h-[30vh] md:h-[40vh] mb-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSIgLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]"></div>
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 text-center px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100 drop-shadow-lg">
              Popular Actors
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-center px-4 text-white/90">
            Discover the most celebrated talents in film and television
          </p>
        </div>
        
        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-black to-transparent"></div>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Search and filter controls */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input with animated focus effect */}
            <div className={`relative flex-1 transition-all duration-300 ${isSearchFocused ? 'md:flex-grow-[2]' : ''}`}>
              <input
                type="text"
                placeholder="Search actors..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-5 py-4 rounded-full border-2 border-purple-200 dark:border-purple-900/50 focus:border-purple-500 dark:focus:border-purple-600 bg-white dark:bg-black/40 dark:backdrop-blur-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-md dark:shadow-purple-900/20 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 hover:text-gray-700 dark:hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* Sorting dropdown */}
            <div className="md:w-64">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full px-5 py-4 rounded-full border-2 border-purple-200 dark:border-purple-900/50 focus:border-purple-500 dark:focus:border-purple-600 bg-white dark:bg-black/40 dark:backdrop-blur-xl text-gray-800 dark:text-white shadow-md dark:shadow-purple-900/20 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5em'
                }}
              >
                {sortingOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Actor Grid with CSS-based staggered animation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredActors.map((actor, index) => (
                <div
                  key={actor.id}
                  className={`opacity-0 translate-y-5 transition-all duration-500 ease-out ${
                    animatedActors.includes(actor.id) ? 'opacity-100 translate-y-0' : ''
                  }`}
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <Link href={`/actors/${actor.id}`} className="block h-full">
                    <div className="h-full actor-card rounded-2xl overflow-hidden shadow-lg dark:shadow-purple-900/10 hover:shadow-xl dark:hover:shadow-purple-700/20 transition-all duration-300 transform hover:-translate-y-1">
                      <ActorImage
                        profilePath={actor.profile_path}
                        gender={actor.gender}
                        name={actor.name}
                      />
                      
                      {/* Known for section */}
                      {actor.known_for && actor.known_for.length > 0 && (
                        <div className="px-3 py-2 bg-white/90 dark:bg-black/50 dark:backdrop-blur-md text-xs text-gray-600 dark:text-gray-300 truncate border-t border-gray-100 dark:border-purple-900/20">
                          <span className="font-medium">Known for: </span>
                          {actor.known_for.map(item => item.title || item.name).join(', ')}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* No results message */}
            {filteredActors.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No actors found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Enhanced pagination with gradient buttons */}
            {filteredActors.length > 0 && (
              <div className="mt-12 flex flex-col items-center space-y-4">
                <div className="flex justify-center items-center space-x-2 flex-wrap">
                  {/* Previous button */}
                  <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className={`px-4 py-3 rounded-full flex items-center gap-2 font-medium transition-all duration-300 ${
                      page === 1 
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </button>

                  {/* Page indicator with fancy styling */}
                  <div className="px-6 py-3 bg-white dark:bg-black/40 dark:backdrop-blur-lg border-2 border-purple-200 dark:border-purple-900/30 rounded-full text-center min-w-[150px] shadow-md dark:shadow-purple-900/10">
                    <span className="text-gray-500 dark:text-gray-400">Page</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400 mx-1">{page}</span>
                    <span className="text-gray-500 dark:text-gray-400">of</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400 ml-1">{totalPages}</span>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className={`px-4 py-3 rounded-full flex items-center gap-2 font-medium transition-all duration-300 ${
                      page === totalPages 
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1"
                    }`}
                  >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                {/* Page jumping options */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {[1, Math.floor(totalPages / 2), totalPages].map(pageNum => (
                    page !== pageNum && (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className="px-3 py-1 bg-white dark:bg-white/10 hover:bg-purple-50 dark:hover:bg-white/15 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors"
                      >
                        {pageNum === 1 ? "First" : pageNum === totalPages ? "Last" : "Middle"}
                      </button>
                    )
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Footer gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-600/10 to-transparent z-0"></div>
      
      {/* Add CSS animations to replace framer-motion */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

export default PopularActors