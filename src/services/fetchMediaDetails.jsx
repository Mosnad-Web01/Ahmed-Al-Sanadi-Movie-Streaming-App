// services/fetchMediaDetails.js
import { fetchDataFromTMDB } from '@/util/fetchDataFromTMDB';

export async function fetchMediaDetails(mediaId, mediaType) {
  try {
    // Determine the base URL depending on media type (movie or TV show)
    const baseURL = mediaType === 'movie' ? `/movie/${mediaId}` : `/tv/${mediaId}`;
    
    // Fetch common data for both movie and TV show
    const [details, videos, credits, reviews, recommendations] = await Promise.all([
      fetchDataFromTMDB(baseURL), // Fetch either movie or TV show details
      fetchDataFromTMDB(`${baseURL}/videos`),
      fetchDataFromTMDB(`${baseURL}/credits`),
      fetchDataFromTMDB(`${baseURL}/reviews`),
      fetchDataFromTMDB(`${baseURL}/recommendations`)
    ]);

    // Return the common data structure
    return {
      ...details,
      videos,
      cast: credits.cast,
      reviews,
      recommendations,
      // Include seasons if it's a TV show
      seasons: mediaType === 'tv' ? details.seasons : null
    };
  } catch (error) {
    console.error(`Error fetching ${mediaType} details:`, error);
    return {
      details: null,
      videos: null,
      cast: null,
      reviews: null,
      recommendations: null,
      seasons: mediaType === 'tv' ? null : undefined // Only return null for TV shows
    };
  }
}
