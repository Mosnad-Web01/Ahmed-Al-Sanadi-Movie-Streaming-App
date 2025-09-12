import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect, useCallback } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import { showSuccessToast, showErrorToast } from '../util/toast';

export const useLikes = (mediaId, mediaType) => {
  const { currentUser, refreshUserData } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (currentUser) {
      let likedArray = [];
      if (mediaType === "movie") {
        likedArray = currentUser.likedMovies || [];
      } else if (mediaType === "tv") {
        likedArray = currentUser.likedTvShows || [];
      } else if (mediaType === "person") {
        likedArray = currentUser.likedActors || []; // Handle actors (persons)
      }
      setIsLiked(likedArray.includes(mediaId));
    }
  }, [currentUser, mediaId, mediaType]);

  const toggleLike = useCallback(async () => {
    if (!currentUser || isUpdating) return;

    const newLikedState = !isLiked;
    setIsLiked(newLikedState); // Optimistic update
    setIsUpdating(true);

    const userRef = doc(db, 'users', currentUser.uid);
    let arrayField = '';
    if (mediaType === 'movie') {
      arrayField = 'likedMovies';
    } else if (mediaType === 'tv') {
      arrayField = 'likedTvShows';
    } else if (mediaType === 'person') {
      arrayField = 'likedActors'; // Field for actors
    }

    try {
      await updateDoc(userRef, {
        [arrayField]: newLikedState ? arrayUnion(mediaId) : arrayRemove(mediaId),
      });
      await refreshUserData(); // Refresh user data to ensure consistency
      showSuccessToast(newLikedState ? 'Added to likes!' : 'Removed from likes!');
    } catch (error) {
      console.error('Error updating likes:', error);
      setIsLiked(!newLikedState); // Revert optimistic update if there's an error
      showErrorToast('Failed to update likes. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  }, [currentUser, isLiked, isUpdating, mediaId, mediaType, refreshUserData]);

  return { isLiked, toggleLike, isUpdating };
};
