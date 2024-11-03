"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchDataFromTMDB } from "@/util/fetchDataFromTMDB";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import MediaGroup from "@/components/MediaGroup";

const Profile = ({ params }) => {
  const { id } = params;
  const { currentUser, deleteAccount } = useAuth();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [actors, setActors] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const fetchLikedMedia = async () => {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User Data:", userData);

            const likedMovies = await fetchMedia(userData.likedMovies || [], "movie");
            const likedTvShows = await fetchMedia(userData.likedTvShows || [], "tv");
            const likedActors = await fetchMedia(userData.likedActors || [], "person");

            // Fetch Watch Later Media
            const watchLaterList = await fetchWatchLaterMedia(userData.watchLater || []);

            setMovies(likedMovies);
            setTvShows(likedTvShows);
            setActors(likedActors);
            setWatchLater(watchLaterList);
          } else {
            console.log("No user data found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data or media:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchLikedMedia();
    }
  }, [currentUser]);

  const fetchMedia = async (ids, type) => {
    if (ids.length === 0) {
      console.warn(`No IDs to fetch for type: ${type}`);
      return [];
    }

    try {
      console.log(`Fetching ${type} data for IDs:`, ids);
      const fetchedMedia = await Promise.all(
        ids.map(async (id) => {
          let media;
          if (type === "person") {
            media = await fetchDataFromTMDB(`/person/${id}?append_to_response=movie_credits,external_ids`);
          } else {
            media = await fetchDataFromTMDB(`/${type}/${id}`);
          }
          return media;
        })
      );
      return fetchedMedia.filter((item) => item);
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      return [];
    }
  };

  const fetchWatchLaterMedia = async (watchLaterList) => {
    if (watchLaterList.length === 0) {
      console.warn("No Watch Later items to fetch");
      return [];
    }

    try {
      console.log("Fetching Watch Later data for items:", watchLaterList);
      const fetchedMedia = await Promise.all(
        watchLaterList.map(async (item) => {
          const type = item.type === "movie" ? "movie" : "tv";
          const media = await fetchDataFromTMDB(`/${type}/${item.id}`);
          return { ...media, type };
        })
      );
      return fetchedMedia.filter((item) => item);
    } catch (error) {
      console.error("Error fetching Watch Later data:", error);
      return [];
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        await deleteAccount();
        // Route to the login page or homepage after account deletion
      } catch (error) {
        console.error("Error deleting account:", error);
        setIsDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="text-center bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">No user data found</h2>
          <p className="mb-6 text-gray-600">Please log in to view your profile.</p>
          <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome, {currentUser.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your movie preferences and account settings</p>
            </div>
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Link href={`/profile/${id}/edit`} className="inline-block bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg">
                Update Profile
              </Link>
              <button
                className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Remove Account"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MediaGroup title="Liked Movies" media={movies} mediaType="movie" />
          <MediaGroup title="Liked TV Shows" media={tvShows} mediaType="tv" />
          <MediaGroup title="Liked Actors" media={actors} mediaType="person" />
          <MediaGroup title="Watch Later" media={watchLater} mediaType="watchLater" />
        </div>
      </div>
    </div>
  );
};

export default Profile;