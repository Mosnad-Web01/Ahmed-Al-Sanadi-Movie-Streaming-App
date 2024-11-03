// React & Next imports
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';

// Third-party library imports
import debounce from 'lodash/debounce';
import { TrendingUpIcon, SearchIcon, XIcon } from '@heroicons/react/solid';

// util imports
import { fetchDataFromTMDB } from '@/util/fetchDataFromTMDB';
import { getImageUrl } from '@/util/tmdbImageConstants';



const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestedResults, setSuggestedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && !query) {
      fetchTrendingSearches();
    }
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, query]);

  const fetchTrendingSearches = async () => {
    try {
      const data = await fetchDataFromTMDB('/trending/all/day');
      setSuggestedResults(data.results.slice(0, 10));
    } catch (error) {
      console.error('Error fetching trending searches:', error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => { 
      if (!searchQuery.trim()) { 
        fetchTrendingSearches();
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchDataFromTMDB(`/search/multi?query=${encodeURIComponent(searchQuery)}&page=1`);
        setSuggestedResults(data.results.slice(0, 10));
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleItemClick = (item) => {
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-lg shadow-lg overflow-hidden relative">
        <div className="p-4">
          <form action="/search" className="relative mt-3">
            <input
              name='query'
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for a movie, tv show, person..."
              className="w-full p-3 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#01b4e4]"
            />
            <button type="submit" className="absolute right-3 top-3">
              <SearchIcon role='button' className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </form>
          
          {isLoading ? (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#01b4e4] mx-auto"></div>
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300 flex items-center">
                {query ? <SearchIcon className="w-5 h-5 mr-2" /> : <TrendingUpIcon className="w-5 h-5 mr-2" />}
                {query ? 'Search Results' : 'Trending'}
              </h3>
              <ul className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {suggestedResults.map((item) => (
                  <li key={item.id} className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 ease-in-out p-2">
                    <Link href={`/${item.media_type ==='person' ? 'actors' : item.media_type}/${item.id}`} onClick={() => handleItemClick(item)} className="flex items-center w-full">
                      <div className="flex items-center">
                        {item.poster_path || item.profile_path ? (
                          <Image
                            src={getImageUrl("POSTER","SMALL", item.poster_path || item.profile_path)}
                            alt={item.title || item.name}
                            width={45}
                            height={68}
                            className="mr-3 rounded"
                            style={{
                              maxWidth: "100%",
                              height: "auto"
                            }} />
                        ) : (
                          <div className="w-[45px] h-[68px] bg-gray-300 mr-3 rounded flex items-center justify-center">
                            <SearchIcon className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{item.title || item.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{item.media_type}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <button onClick={onClose} className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <XIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
