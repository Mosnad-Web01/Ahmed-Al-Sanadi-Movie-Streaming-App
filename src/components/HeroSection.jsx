"use client"
import React from "react"
import { coverBG } from "@/util/local-ImageConstants"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/contexts/AuthContext" // Import the AuthContext

const HeroSection = () => {
  const { t } = useTranslation("common")
  const { currentUser } = useAuth() // access the currentUser from AuthContext
  console.log(currentUser)

  return (
    <div className="relative w-full h-[650px] lg:h-[600px]   overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px rgba(0, 0, 0, 0.8)",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
        }}
      ></div>

      <header
        className="absolute inset-0 bg-cover bg-center h-full"
        style={{
          backgroundImage: `url(${coverBG.src})`,
          boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.8)",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80 blur"></div>
        {/* <div className="dark:absolute inset-0  dark:bg-gradient-to-t  dark:from-gray-900 to-transparent blur"></div> */}

        {/* Conditional Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-white px-4 text-center">
          {currentUser ? (
            // If the user is logged in, display this content
            <>
              <h1 className="text-4xl md:text-6xl lg:text-6xl font-[600]  md:font-[700] lg:font-[900]  tracking-wide mb-6">
                <span style={{ wordSpacing: "-20px" }} className="bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text  text-transparent ">
                  {t("hero.welcome")}{" "}
                </span>
                <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text  text-transparent ">
                  {currentUser.name || "User"}{" "}
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-bold mb-2 ">
                {t("hero.enjoyContent")}
              </p>
              <p className="text-xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text  text-transparent">
                {t("hero.enjoyContent1")}
              </p>
            </>
          ) : (
            // If the user is not logged in, display the default content
            <>
              <h1 className="text-4xl md:text-6xl lg:text-6xl font-[600]  md:font-[700] lg:font-[900]  tracking-wide mb-6">
                {t("hero.header1")}
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-6xl font-[600]  md:font-[700] lg:font-[900]  tracking-wide mb-6">
                {t("hero.header2")}
              </h1>
              <p className="text-xl md:text-2xl mb-2">
                {t("hero.startingPrice")}
              </p>
              <p className="text-lg md:text-xl mb-6">
                {t("hero.readyToWatch")}
              </p>

              {/* Email input and button only shown when user is not logged in */}
              <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[600px]">
                <input
                  type="email"
                  placeholder={t("hero.emailPlaceholder")}
                  className="flex-grow py-3 px-4 text-black rounded-md text-lg"
                />
                <button className="bg-[#e50914] text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#f6121d] transition-colors">
                  {t("hero.getStarted")}
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Gradient border at the bottom */}
      <div
        className="absolute bottom-2 left-0 right-0 h-[68px]"
        style={{
          background:
            "linear-gradient(to right, rgba(33, 13, 22, 1) 16%, rgba(184, 40, 105, 1), rgba(229, 9, 20, 1), rgba(184, 40, 105, 1), rgba(33, 13, 22, 1) 84%)",
          borderTopLeftRadius: "100% 200%",
          borderTopRightRadius: "100% 200%",
          transform: "translateY(1px)",
        }}
      ></div>

      {/* Curved overlay */}
      <div
        className="absolute bottom-0 mt-2 h-16 md:h-16 lg:h-[70px] left-0 right-0 bg-gray-200 dark:bg-gray-900 transition-colors duration-300"
        style={{
          borderTopLeftRadius: "50% 100%",
          borderTopRightRadius: "50% 100%",
          transform: "translateY(1px)",
        }}
      ></div>
    </div>
  )
}

export default HeroSection
