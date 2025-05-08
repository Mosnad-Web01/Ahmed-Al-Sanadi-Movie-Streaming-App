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
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateNavLinksWithGenres = async () => {
      const movieGenres = await fetchGenres(i18n.language)
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
  }, [i18n.language])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-90' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <nav className="container mx-auto h-16 flex items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-12">
          <div className="md:hidden">
            <MenuIcon
              className="w-6 h-6 cursor-pointer text-white"
              onClick={toggleSidebar}
            />
          </div>

          <Link href="/">
            <div className="cursor-pointer flex items-center space-x-2">
              <span className="text-2xl font-bold text-[#e50914] lg:hidden">
                TMDB
              </span>
              <Image
                className="w-28 h-8 hidden lg:block"
                src={logo}
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </div>
          </Link>

          <div className="hidden md:flex space-x-6 text-sm font-medium text-white">
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
              className="hover:text-gray-300 flex items-center text-base font-normal"
            >
              {t("navbar.Actors")}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6 mx-2">
          <SearchIcon
            className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer md:block"
            onClick={toggleSearch}
          />
          <div className="hidden sm:block">
            <LanguageChanger />
          </div>
          
          <div
            onClick={toggleDarkMode}
            className="text-white cursor-pointer"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={19} />}
          </div>

          <div className="ml-2">
            <button className="bg-[#e50914] text-white py-1 px-4 text-sm font-medium rounded hover:bg-[#f40612] transition-colors">
              Sign In
            </button>
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