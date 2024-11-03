// components/Navbar.js
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon, SearchIcon } from "@heroicons/react/solid"
import { FaMoon, FaSun } from "react-icons/fa"
import Sidebar from "./Sidebar"
import LinkDropdown from "./LinkDropdown"
import ProfileDropdown from "./ProfileDropdown"
import SearchBar from "./SearchBar"
import LanguageChanger from "./LanguageChanger"
import { logo } from "@/util/local-ImageConstants"
import { fetchGenres } from "@/services/fetchGenres"
import { useDarkMode } from "@/hooks/useDarkMode"
import { useTranslation } from "react-i18next"

const NAV_LINKS_TEMPLATE = [
  { label: "Genres", dropdownItems: [] },
  {
    label: "Movies",
    href: "movie",
    dropdownItems: ["Popular", "Top Rated", "Upcoming", "Now Playing"],
  },
  {
    label: "TV Shows",
    href: "tv",
    dropdownItems: ["Popular", "Airing Today", "On The Air", "Top Rated"],
  },
]

const Navbar = () => {
  const { t, i18n } = useTranslation("common")
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [navLinks, setNavLinks] = useState(NAV_LINKS_TEMPLATE)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  useEffect(() => {
    const updateNavLinksWithGenres = async () => {
      const movieGenres = await fetchGenres(i18n.language) // Pass the current language
      setNavLinks((prevLinks) =>
        prevLinks.map((link) => {
          if (link.label === "Genres") {
            return { ...link, dropdownItems: movieGenres }
          }
          return link
        }),
      )
    }

    updateNavLinksWithGenres()
  }, [i18n.language]) // Re-fetch when language changes

  return (
    <header className="bg-gray-200 dark:bg-gray-900 text-[#032541] dark:text-white sticky top-0 z-50 shadow-lg  transition-colors duration-300">
      <nav className="container mx-auto h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-12">
          <div className="md:hidden">
            <MenuIcon
              className="w-6 h-6 cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>

          <Link href="/">
            <div className="cursor-pointer flex items-center space-x-2">
              <span className="text-2xl font-bold text-[#5fcde4] lg:hidden">
                TMDB
              </span>
              <Image
                className="w-36 h-5 hidden lg:block"
                src={logo}
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </div>
          </Link>

          <div className="hidden md:flex space-x-4 text-sm font-medium">
            {navLinks.map((link, index) => (
              <LinkDropdown
                key={index}
                label={t(`navbar.${link.label}`)}
                dropdownItems={link.dropdownItems}
                href={link.href}
                dropdownItemshref={link.dropdownItemshref}
              />
            ))}
            <Link
              href="/actors"
              className="hover:text-[#01b4e4] flex items-center text-lg font-semibold"
            >
              {t("navbar.Actors")}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-4 mx-2">
          <SearchIcon
            className="w-6 h-6 hover:text-[#01b4e4] cursor-pointer md:block"
            onClick={toggleSearch}
          />
          <div className="hidden sm:block">
            <LanguageChanger />
          </div>
          
          <div
            onClick={toggleDarkMode}
            className="rounded-full p-1  border-1 border-solid border-gray-900 dark:border-none"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={19} />}
          </div>

          <ProfileDropdown />
        </div>
      </nav>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        navLinks={navLinks}
      />

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}

export default Navbar
