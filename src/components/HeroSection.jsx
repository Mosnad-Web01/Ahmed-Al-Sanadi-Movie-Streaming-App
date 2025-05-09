"use client"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/contexts/AuthContext"
import { coverBG } from "@/util/local-ImageConstants"

const HeroSection = () => {
  const { t } = useTranslation("common")
  const { currentUser } = useAuth()

  return (
    <div className="relative w-full h-[90vh] min-h-[700px] overflow-hidden">
      {/* Background Image with Parallax Effect - Always animated */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-700 ease-out motion-reduce:transform-none"
        style={{
          backgroundImage: `url(${coverBG.src})`,
          animation: "subtle-zoom 20s infinite alternate ease-in-out",
        }}
      >
        {/* Dark mode overlay - keep this but ensure it doesn't block animation */}
        <div className="absolute inset-0 bg-transparent dark:bg-black/60" />

        {/* Combined lighting effect for both modes */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#032541]/10 via-transparent to-[#032541]/20 dark:from-black dark:via-black/20 dark:to-black/10 duration-300" />

        {/* Vignette - modified to work in both modes */}
        <div className="absolute inset-0 box-border shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
      </div>

      {/* Content - rest remains the same */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl mx-auto backdrop-blur-[2px] dark:backdrop-blur-none p-6 rounded-xl bg-white/20 dark:bg-transparent">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#032541] to-[#0a4e82] dark:text-white drop-shadow-[0_2px_2px_rgba(255,255,255,0.5)] dark:drop-shadow-none">
            {t("hero.header1")}
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-[#032541] dark:text-white drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
            {t("hero.header2")}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-[#032541] dark:text-gray-200 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
            {t("hero.readyToWatch")}
          </p>
          

          {!currentUser && (
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[600px] mx-auto">
              <input
                type="email"
                placeholder={t("hero.emailPlaceholder")}
                className="flex-grow py-4 px-4 text-[#032541] bg-white/80 backdrop-blur-sm border-b-2 border-[#032541]  placeholder-gray-500  rounded-sm text-lg focus:outline-none focus:bg-white/90 focus:border-[#0a81c2] transition-all duration-300"
              />
              <button className="relative overflow-hidden py-4 px-6 rounded-sm text-lg font-semibold whitespace-nowrap group transition-all duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-[#032541] to-[#0a81c2] dark:from-[#e50914] dark:to-[#e50914] transform translate-y-0 group-hover:translate-y-[-3px] transition-transform duration-300"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10 text-white flex items-center">
                  {t("hero.getStarted")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Netflix-style curved gradient divider - modified wave animation to work in dark mode */}
      <div className="absolute -bottom-2 left-0 right-0 h-[7rem] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 -mt-[0.25rem] h-[calc(100%+0.25rem)]
            bg-gradient-to-r 
            from-[#c9e3f8] dark:from-[#210d16] from-16%
            via-[#0a81c2] dark:via-[#b82869] 
            via-[#032541] dark:via-[#e50914] 
            via-[#0a81c2] dark:via-[#b82869] 
            to-[#c9e3f8] dark:to-[#210d16] to-84%
            rounded-tl-[50%_100%] rounded-tr-[50%_100%]
            shadow-lg dark:shadow-none"
          />
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-full border-t-[0.25rem] border-transparent
          rounded-tl-[70%_100%] rounded-tr-[70%_100%] 
          bg-gradient-to-b from-[rgba(10,129,194,0.1)] to-gray-200 dark:bg-[radial-gradient(50%_500%_at_50%_-420%,rgba(64,97,231,0.4)_80%,rgba(0,0,0,0.1)_100%)]
          bg-gray-200 dark:bg-black
          bg-clip-padding"
        />

        {/* Wave animation - now works in both light and dark mode with adjusted opacity */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <div
            className="absolute bottom-0 left-0 w-full h-4 opacity-30 dark:opacity-20"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iIzAzMjU0MSIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMCwxNjBMMzAsMTcwLjdDNjAsMTgxLDEyMCwyMDMsMTgwLDIxMy4zQzI0MCwyMjQsMzAwLDIyNCwzNjAsMjEzLjNDNDIwLDIwMyw0ODAsMTgxLDU0MCwxNzAuN0M2MDAsMTYwLDY2MCwxNjAsNzIwLDE3MC43Qzc4MCwxODEsODQwLDIwMyw5MDAsMTkyQzk2MCwxODEsMTAyMCwxMzksMTA4MCwxMjhDMTE0MCwxMTcsMTIwMCwxMzksMTI2MCwxNzAuN0MxMzIwLDIwMywxMzgwLDI0NSwxNDEwLDI2Ni43TDE0NDAsMjg4TDE0NDAsMzIwTDE0MTAsMzIwQzEzODAsMzIwLDEzMjAsMzIwLDEyNjAsMzIwQzEyMDAsMzIwLDExNDAsMzIwLDEwODAsMzIwQzEwMjAsMzIwLDk2MCwzMjAsOTAwLDMyMEM4NDAsMzIwLDc4MCwzMjAsNzIwLDMyMEM2NjAsMzIwLDYwMCwzMjAsNTQwLDMyMEM0ODAsMzIwLDQyMCwzMjAsMzYwLDMyMEMzMDAsMzIwLDI0MCwzMjAsMTgwLDMyMEMxMjAsMzIwLDYwLDMyMCwzMCwzMjBMMCwzMjBaIj48L3BhdGg+PC9zdmc+')",
              backgroundSize: "100% 100%",
              animation: "wave-animation 8s linear infinite",
            }}
          ></div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes subtle-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }

        @keyframes wave-animation {
          0% {
            background-position-x: 0%;
          }
          100% {
            background-position-x: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default HeroSection
