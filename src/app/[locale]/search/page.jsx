
import SearchResults from "@/components/SearchResults";
const ResultPage = async ({ searchParams }) => {
 const {query} = searchParams;
 return (
    <SearchResults query={query} />
  );
}
export default ResultPage;