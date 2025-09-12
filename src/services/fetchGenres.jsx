
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB";


export const fetchGenres = async (language = "en") => {
    try {
      const data = await fetchDataFromTMDB('/genre/movie/list', language);
      return data.genres.map(genre => genre.name); // Return only genre names
    } catch (error) {
      console.error(`Error fetching Movie genres:`, error);
      return [];
    }
  };
  