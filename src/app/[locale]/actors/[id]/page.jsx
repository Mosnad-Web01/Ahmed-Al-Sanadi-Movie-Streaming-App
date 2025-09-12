"use client";
import React, { useEffect, useState, Suspense } from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaImdb, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB";
import { getImageUrl } from "@/util/tmdbImageConstants";
import InteractiveButtons from "@/components/InteractiveButtons";
const FlipCard = React.lazy(() => import("@/components/FlipCard"));
import debounce from 'lodash/debounce';

const ActorPage = ({ params }) => {
  const { id } = params;
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [activeSection, setActiveSection] = useState("movies"); // Default section
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const getActorDetails = debounce(async () => {
      try {
        const data = await fetchDataFromTMDB(
          `/person/${id}?append_to_response=movie_credits,tv_credits,external_ids,images,tagged_images`
        );
        setActor(data);
        setImgSrc(getImageUrl("PROFILE", "XXLARGE", data.profile_path));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actor details:", error);
        setLoading(false);
      }
    }, 300);

    getActorDetails();
    return () => getActorDetails.cancel();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!actor) return <div className="text-center p-10">Actor not found</div>;

  const biography = actor.biography || "Biography not available.";
  const isBiographyLong = biography.length > 400;
  const displayedBiography = showFullBiography ? biography : biography.slice(0, 400);
  
  // Calculate age
  const calculateAge = (birthday) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  const age = calculateAge(actor.birthday);
  
  // Get notable movies and TV shows
  const movieCredits = actor.movie_credits?.cast || [];
  const tvCredits = actor.tv_credits?.cast || [];
  
  // Sort by popularity
  const sortedMovies = [...movieCredits].sort((a, b) => b.popularity - a.popularity);
  const sortedTVShows = [...tvCredits].sort((a, b) => b.popularity - a.popularity);
  
  const getRandomGradient = () => {
    const gradients = [
      "from-indigo-500 via-purple-500 to-pink-500",
      "from-cyan-500 to-blue-500",
      "from-emerald-500 to-teal-500",
      "from-rose-400 via-fuchsia-500 to-indigo-500",
      "from-amber-500 to-pink-500"
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };
  
  const primaryGradient = "from-purple-600 to-indigo-600";
  const secondaryGradient = "from-rose-500 to-orange-500";

  return (
    <div className="bg-slate-50 dark:bg-black text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageUrl("BACKDROP", "ORIGINAL", 
              actor.tagged_images?.results[0]?.file_path || 
              actor.movie_credits?.cast[0]?.backdrop_path)})`,
            filter: 'blur(3px)',
            transform: 'scale(1.1)'
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-slate-50 dark:to-black"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 max-w-6xl">
            {/* Actor Image with Enhanced Glow Effect for Dark Mode */}
            <div className="relative w-64 h-64 md:w-80 md:h-auto flex-shrink-0 z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-xl opacity-70 animate-pulse dark:opacity-90 dark:blur-2xl"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-white dark:border-purple-900/30 shadow-2xl dark:shadow-purple-500/20 aspect-square">
                <Image
                  src={imgSrc}
                  alt={actor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Name and Quick Info */}
            <div className="text-center md:text-left text-white z-10 md:ml-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-purple-300">
                {actor.name}
              </h1>
              
              {actor.known_for_department && (
                <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 dark:shadow-lg dark:shadow-purple-500/20">
                  {actor.known_for_department}
                </div>
              )}
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                {actor.place_of_birth && (
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 dark:bg-white/10 dark:backdrop-blur-xl dark:border dark:border-white/10">
                    <span className="text-sm">📍 {actor.place_of_birth}</span>
                  </div>
                )}
                
                {actor.birthday && (
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 dark:bg-white/10 dark:backdrop-blur-xl dark:border dark:border-white/10">
                    <span className="text-sm">🎂 {new Date(actor.birthday).toLocaleDateString()} {age && `(${age} years)`}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl -mt-20 relative z-10">
        {/* Biography Card */}
        <div className="bg-white dark:bg-black/40 dark:backdrop-blur-xl dark:border dark:border-purple-900/30 dark:shadow-xl dark:shadow-purple-700/5 rounded-xl shadow-xl p-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-blue-400">
              Biography
            </h2>
            
            {/* Social Media Icons with Enhanced Glow for Dark Mode */}
            <div className="flex gap-2">
              {actor.external_ids?.instagram_id && (
                <a
                  href={`https://instagram.com/${actor.external_ids.instagram_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:shadow-lg transition transform hover:scale-110 dark:shadow-md dark:shadow-pink-600/20"
                >
                  <FaInstagram size={18} />
                </a>
              )}
              
              {actor.external_ids?.twitter_id && (
                <a
                  href={`https://twitter.com/${actor.external_ids.twitter_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:shadow-lg transition transform hover:scale-110 dark:shadow-md dark:shadow-blue-600/20"
                >
                  <FaTwitter size={18} />
                </a>
              )}
              
              {actor.external_ids?.facebook_id && (
                <a
                  href={`https://facebook.com/${actor.external_ids.facebook_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full hover:shadow-lg transition transform hover:scale-110 dark:shadow-md dark:shadow-blue-700/20"
                >
                  <FaFacebook size={18} />
                </a>
              )}
              
              {actor.external_ids?.imdb_id && (
                <a
                  href={`https://imdb.com/name/${actor.external_ids.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full hover:shadow-lg transition transform hover:scale-110 dark:shadow-md dark:shadow-yellow-500/20"
                >
                  <FaImdb size={18} />
                </a>
              )}
            </div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {displayedBiography}
              {isBiographyLong && !showFullBiography && "..."}
            </p>
            
            {isBiographyLong && (
              <button
                onClick={() => setShowFullBiography(!showFullBiography)}
                className="mt-4 text-purple-600 dark:text-purple-400 font-medium hover:underline focus:outline-none"
              >
                {showFullBiography ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
          
          <div className="mt-6">
            <InteractiveButtons mediaId={actor.id} mediaType="person" />
          </div>
        </div>
        
        {/* Quick Stats with Enhanced Hover Animations for Dark Mode */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-white dark:bg-black/40 dark:backdrop-blur-lg dark:border dark:border-purple-900/20 rounded-xl shadow-md p-4 text-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-purple-500/20 dark:hover:border-purple-500/40">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{movieCredits.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Movies</div>
          </div>
          
          <div className="bg-white dark:bg-black/40 dark:backdrop-blur-lg dark:border dark:border-indigo-900/20 rounded-xl shadow-md p-4 text-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-indigo-500/20 dark:hover:border-indigo-500/40">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{tvCredits.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">TV Shows</div>
          </div>
          
          <div className="bg-white dark:bg-black/40 dark:backdrop-blur-lg dark:border dark:border-rose-900/20 rounded-xl shadow-md p-4 text-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-rose-500/20 dark:hover:border-rose-500/40">
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              {actor.popularity ? actor.popularity.toFixed(1) : "N/A"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Popularity</div>
          </div>
          
          <div className="bg-white dark:bg-black/40 dark:backdrop-blur-lg dark:border dark:border-amber-900/20 rounded-xl shadow-md p-4 text-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-amber-500/20 dark:hover:border-amber-500/40">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {actor.images?.profiles?.length || "0"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Photos</div>
          </div>
        </div>
        
        {/* Section Navigation with Glowing Effect for Dark Mode */}
        <div className="flex overflow-x-auto pb-2 mb-6 gap-2 scrollbar-thin scrollbar-thumb-purple-600 dark:scrollbar-thumb-purple-500/70 scrollbar-track-transparent">
          <button
            onClick={() => setActiveSection("movies")}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              activeSection === "movies"
                ? `bg-gradient-to-r ${primaryGradient} text-white shadow-md dark:shadow-purple-500/30`
                : "bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/15"
            }`}
          >
            Movie Roles
          </button>
          
          <button
            onClick={() => setActiveSection("tv")}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              activeSection === "tv"
                ? `bg-gradient-to-r ${primaryGradient} text-white shadow-md dark:shadow-purple-500/30`
                : "bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/15"
            }`}
          >
            TV Roles
          </button>
          
          <button
            onClick={() => setActiveSection("images")}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              activeSection === "images"
                ? `bg-gradient-to-r ${primaryGradient} text-white shadow-md dark:shadow-purple-500/30`
                : "bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/15"
            }`}
          >
            Gallery
          </button>
          
          <button
            onClick={() => setActiveSection("highlights")}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              activeSection === "highlights"
                ? `bg-gradient-to-r ${primaryGradient} text-white shadow-md dark:shadow-purple-500/30`
                : "bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/15"
            }`}
          >
            Career Highlights
          </button>
        </div>
        
        {/* Dynamic Content Section */}
        <div className="min-h-[40vh]">
          {activeSection === "movies" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-blue-400">
                Movie Appearances
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedMovies.slice(0, 9).map((movie) => (
                  <Link href={`/movie/${movie.id}`} key={movie.id}>
                    <div className="bg-white dark:bg-black/40 dark:backdrop-blur-lg dark:border dark:border-purple-900/20 rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition duration-300 h-full flex flex-col dark:hover:shadow-purple-500/20 dark:hover:border-purple-500/30">
                      <div className="relative h-48">
                        <Image
                          src={getImageUrl("BACKDROP", "MEDIUM", movie.backdrop_path || movie.poster_path)}
                          alt={movie.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        {movie.vote_average > 0 && (
                          <div className="absolute top-2 right-2 bg-black/60 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center dark:bg-white/10 dark:backdrop-blur-xl">
                            {movie.vote_average.toFixed(1)}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                          {movie.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                        </p>
                        
                        {movie.character && (
                          <p className="text-sm italic text-gray-700 dark:text-gray-300 mt-auto">
                            as <span className="font-medium">{movie.character}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {sortedMovies.length > 9 && (
                <div className="text-center mt-8">
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transition duration-300 transform hover:scale-105 dark:shadow-md dark:shadow-purple-500/30">
                    Load More Movies
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeSection === "tv" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-blue-400">
                TV Show Appearances
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTVShows.slice(0, 9).map((show) => (
                  <Link href={`/tv/${show.id}`} key={show.id}>
                    <div className="bg-white dark:bg-black/40 dark:backdrop-blur-lg dark:border dark:border-purple-900/20 rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition duration-300 h-full flex flex-col dark:hover:shadow-purple-500/20 dark:hover:border-purple-500/30">
                      <div className="relative h-48">
                        <Image
                          src={getImageUrl("BACKDROP", "MEDIUM", show.backdrop_path || show.poster_path)}
                          alt={show.name}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        {show.vote_average > 0 && (
                          <div className="absolute top-2 right-2 bg-black/60 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center dark:bg-white/10 dark:backdrop-blur-xl">
                            {show.vote_average.toFixed(1)}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                          {show.name}
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'TBA'}
                        </p>
                        
                        {show.character && (
                          <p className="text-sm italic text-gray-700 dark:text-gray-300 mt-auto">
                            as <span className="font-medium">{show.character}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {sortedTVShows.length > 9 && (
                <div className="text-center mt-8">
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transition duration-300 transform hover:scale-105 dark:shadow-md dark:shadow-purple-500/30">
                    Load More TV Shows
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeSection === "images" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-blue-400">
                Photo Gallery
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {actor.images?.profiles?.slice(0, 12).map((image, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 group cursor-pointer dark:shadow-purple-500/10 dark:hover:shadow-purple-500/30"
                  >
                    <Image
                      src={getImageUrl("PROFILE", "MEDIUM", image.file_path)}
                      alt={`${actor.name} photo ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="absolute bottom-3 left-3 text-white text-xs">
                        {image.width} × {image.height}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {(actor.images?.profiles?.length > 12) && (
                <div className="text-center mt-8">
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transition duration-300 transform hover:scale-105 dark:shadow-md dark:shadow-purple-500/30">
                    View Full Gallery
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeSection === "highlights" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-blue-400">
                Career Highlights
              </h2>
              
              <div className="relative pl-8 pb-16">
                {/* Timeline line with glowing effect for dark mode */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full ml-3 dark:shadow-md dark:shadow-purple-500/50"></div>
                
                {/* Notable movies with highest ratings or popularity, with a maximum of 5 */}
                {[...movieCredits, ...tvCredits]
                  .sort((a, b) => b.vote_average - a.vote_average)
                  .filter(item => item.vote_average >= 7)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={item.id} className="mb-8 relative">
                      {/* Timeline dot with enhanced glow for dark mode */}
                      <div className="absolute left-[-29px] top-0 w-7 h-7 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg flex items-center justify-center dark:shadow-md dark:shadow-purple-500/50">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      
                      <div className="bg-white dark:bg-black/40 dark:backdrop-blur-lg dark:border dark:border-purple-900/20 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 dark:hover:shadow-purple-500/20">
                        <div className="md:flex">
                          <div className="md:w-1/3 relative h-48 md:h-auto">
                            <Image
                              src={getImageUrl("BACKDROP", "MEDIUM", item.backdrop_path || item.poster_path)}
                              alt={item.title || item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="p-6 md:w-2/3">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-xl">
                                {item.title || item.name}
                              </h3>
                              
                              <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold dark:shadow-sm dark:shadow-yellow-500/30">
                                ★ {item.vote_average.toFixed(1)}
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              {(item.release_date || item.first_air_date) 
                                ? new Date(item.release_date || item.first_air_date).getFullYear() 
                                : 'TBA'}
                              {item.character && ` • as ${item.character}`}
                            </p>
                            
                            {item.overview && (
                              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                                {item.overview}
                              </p>
                            )}
                            
                            <Link 
                              href={`/${item.title ? 'movie' : 'tv'}/${item.id}`}
                              className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition duration-300 dark:shadow-md dark:shadow-purple-500/30"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        
        {/* You May Also Like Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-blue-400">
              Works With Similar Cast
            </span>
          </h2>
          <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-600 dark:scrollbar-thumb-purple-500/70 scrollbar-track-transparent">
            <div className="flex space-x-6">
              {sortedMovies.slice(0, 10).map((item) => (
                <div key={item.id} className="min-w-[200px]">
                  <Suspense fallback={<div className="w-[200px] h-[300px] bg-gray-200 dark:bg-gray-900/50 rounded-xl animate-pulse"></div>}>
                    <FlipCard
                      item={item}
                      mediaType="movie"
                      size="w300"
                      backStyle="default"
                    />
                  </Suspense>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorPage;