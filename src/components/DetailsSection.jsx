import React from "react"
import { formatMoney } from "@/services/format"
import {
  FaGlobe,
  FaLanguage,
  FaCheckCircle,
  FaBuilding,
  FaMoneyBillWave,
  FaTv,
} from "react-icons/fa"

const DetailItem = ({ icon, title, value }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500 mt-1">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-gray-700 dark:text-gray-300">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400">{value}</p>
    </div>
  </div>
)

const DetailsSection = ({ media, mediaType }) => {
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Production Details
            </span>
          </h2>
          <DetailItem
            icon={<FaBuilding />}
            title="Production Companies"
            value={media.production_companies
              .map((company) => company.name)
              .join(", ")}
          />
          <DetailItem
            icon={<FaGlobe />}
            title="Countries"
            value={media.production_countries
              .map((country) => country.name)
              .join(", ")}
          />
          <DetailItem
            icon={<FaLanguage />}
            title="Original Language"
            value={media.original_language.toUpperCase()}
          />
          <DetailItem
            icon={<FaCheckCircle />}
            title="Status"
            value={media.status}
          />
          <DetailItem
            icon={<FaLanguage />}
            title="Spoken Languages"
            value={media.spoken_languages.map((lang) => lang.name).join(", ")}
          />
        </div>

        {mediaType === "movie" && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Financial Details
              </span>
            </h2>
            <DetailItem
              icon={<FaMoneyBillWave />}
              title="Budget"
              value={formatMoney(media.budget)}
            />
            <DetailItem
              icon={<FaMoneyBillWave />}
              title="Revenue"
              value={formatMoney(media.revenue)}
            />
          </div>
        )}

        {mediaType === "tv" && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              TV Show Details
            </h3>
            <DetailItem
              icon={<FaTv />}
              title="Networks"
              value={media.networks.map((network) => network.name).join(", ")}
            />
            <DetailItem
              icon={<FaBuilding />}
              title="Created By"
              value={media.created_by.map((creator) => creator.name).join(", ")}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailsSection
