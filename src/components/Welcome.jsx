"use client"
import React from "react"

const Welcome = () => {
  return (
    <div className="container mx-auto font-custom px-4 md:px-20 mb-10 py-10 md:py-14 bg-blue-400 dark:bg-[#02345c]">
      <div className="text-white font-bold">
        <h1 className="text-4xl md:text-7xl">Welcome.</h1>
        <p className="text-xl md:text-4xl mt-4 md:mt-0">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
      </div>
      <form className="mt-10 flex flex-col md:flex-row md:items-center relative">
        <input
          type="text"
          className="w-full rounded-full p-3 pl-8 text-base md:text-2xl text-gray-500 outline-none"
          placeholder="Search for a movie, TV show, person..."
        />
        <button
          onClick={(e) => e.preventDefault()}
          className="sm:absolute right-0 top-0 text-base md:text-2xl bg-gradient-to-r from-[#1ED5A9] to-[#01B4E4] px-4 md:px-8 py-3 rounded-full mt-4 md:mt-0 md:ml-4"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Welcome
