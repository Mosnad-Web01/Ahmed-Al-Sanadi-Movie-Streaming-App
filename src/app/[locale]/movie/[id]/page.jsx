import CategoryPage from "@/components/CategoryPage";
import { formatCategoryForAPI } from "@/services/formatCategoryForAPI";
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB";
import SingleMediaPage from "@/components/SingleMediaPage";


// In-memory cache
const cache = new Map();

const MoviePage = async ({ params }) => {
  const { id } = params;
  const categories = ['popular', 'top-rated', 'upcoming', 'now-playing'];
  const isCategory = categories.includes(id);

  // Create a function to cache or fetch data from TMDB
  const fetchDataWithCache = async (endpoint) => {
    if (cache.has(endpoint)) {
      return cache.get(endpoint);
    }
    const data = await fetchDataFromTMDB(endpoint);
    cache.set(endpoint, data);  // Cache the fetched data
    return data;
  };

  const endpoint = isCategory 
    ? `/movie/${await formatCategoryForAPI(id)}` 
    : `/movie/${id}`;

  try {
    const data = await fetchDataWithCache(endpoint);

    if (isCategory) {
      return (
        <CategoryPage pageTitle="movie" shows={data.results} categoryId={id} />
      );
    }

    if (data) {
      return <SingleMediaPage media={data} mediaType="movie" />;
    } else {
      return <div>No movie found</div>;
    }

  } catch (error) {
    console.error('Error fetching movie data:', error);
    return <div>Error loading data. Please try again later.</div>;
  }
};

export default MoviePage;
