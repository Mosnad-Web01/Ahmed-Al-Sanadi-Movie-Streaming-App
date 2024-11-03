import CategoryPage from "@/components/CategoryPage";
import { formatCategoryForAPI } from "@/services/formatCategoryForAPI";
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB";
import SingleMediaPage from "@/components/SingleMediaPage"; // Shared component

const TvPage = async ({ params }) => {
  const { id } = params;
  const categories = ["popular", "airing-today", "on-the-air", "top-rated"];

  // Determine if the id is a category or a single TV show
  const isCategory = categories.includes(id);

  // Fetch data based on the category or single TV show
  const endpoint = isCategory 
    ? `/tv/${await formatCategoryForAPI(id)}` 
    : `/tv/${id}`;

  try {
    const data = await fetchDataFromTMDB(endpoint);

    // If it's a category page, show multiple TV shows
    if (isCategory) {
      return (
        <CategoryPage pageTitle="tv" shows={data.results} categoryId={id} />
      );
    }

    // If it's a single TV show, show the SingleMediaPage component
    if (data) {
      return <SingleMediaPage media={data} mediaType="tv" />; // Pass TV show data and type
    } else {
      return <div>No TV show found</div>;
    }

  } catch (error) {
    console.error('Error fetching TV show data:', error);
    return <div>Error loading data. Please try again later.</div>;
  }
};

export default TvPage;
