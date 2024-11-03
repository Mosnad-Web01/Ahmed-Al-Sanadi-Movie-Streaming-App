// src/util/tmdbImageConstants.js

/**
 * Base URL for TMDB images
 * @constant {string}
 */
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";

/**
 * Available image types in TMDB and their corresponding size options
 * @constant {object}
 */
const IMAGE_TYPES = {
  POSTER: {
    SMALL: "w92",
    MEDIUM: "w185",
    LARGE: "w300",
    XLARGE: "w500",
    ORIGINAL: "original",
  },
  PROFILE: {
    SMALL: "w45",
    MEDIUM: "w185",
    LARGE: "w200",
    XLARGE: "w500",
    XXLARGE: "h632",
    ORIGINAL: "original",
  },
  BACKDROP: {
    SMALL: "w300",
    MEDIUM: "w780",
    LARGE: "w1280",
    ORIGINAL: "original",
  },
  LOGO: {
    SMALL: "w45",
    MEDIUM: "w154",
    LARGE: "w500",
    ORIGINAL: "original",
  },
  STILL: {
    SMALL: "w92",
    MEDIUM: "w185",
    LARGE: "w300",
    ORIGINAL: "original",
  }
};

/**
 * Constructs the full image URL for TMDB resources
 * 
 * @param {string} [type='POSTER'] - The type of image (POSTER, PROFILE, BACKDROP, etc.)
 * @param {string} [size='MEDIUM'] - The size of the image (based on type)
 * @param {string} path - The path to the image
 * @returns {string} - The full URL to the image or a placeholder if the path is empty
 */
const getImageUrl = (type = 'POSTER', size = 'MEDIUM', path = "") => {
  const imageSize = IMAGE_TYPES[type]?.[size] || IMAGE_TYPES.POSTER.ORIGINAL;
  return path ? `${BASE_IMAGE_URL}${imageSize}${path}` : '/placeholder-img.jpg';
};

// Export TMDB constants and utility function
export { BASE_IMAGE_URL, IMAGE_TYPES, getImageUrl };
