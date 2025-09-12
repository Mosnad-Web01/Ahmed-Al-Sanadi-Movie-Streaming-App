import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect, useCallback } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import { showSuccessToast, showErrorToast } from '../util/toast';

export const useWatchLater = (mediaId, mediaType) => {
  const { currentUser, refreshUserData } = useAuth();
  const [isInWatchLater, setIsInWatchLater] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const watchLaterArray = currentUser.watchLater || [];
      setIsInWatchLater(
        watchLaterArray.some((item) => item.id === mediaId && item.type === mediaType)
      );
    }
  }, [currentUser, mediaId, mediaType]);

  const toggleWatchLater = useCallback(async () => {
    if (!currentUser || isUpdating) return;

    const newWatchLaterState = !isInWatchLater;
    setIsInWatchLater(newWatchLaterState); // Optimistic update
    setIsUpdating(true);

    const userRef = doc(db, 'users', currentUser.uid);

    const mediaObject = { id: mediaId, type: mediaType };

    try {
      await updateDoc(userRef, {
        watchLater: newWatchLaterState
          ? arrayUnion(mediaObject)
          : arrayRemove(mediaObject),
      });
      await refreshUserData(); // Refresh user data to ensure consistency
      showSuccessToast(
        newWatchLaterState ? 'Added to Watch Later!' : 'Removed from Watch Later!'
      );
    } catch (error) {
      console.error('Error updating watch later:', error);
      setIsInWatchLater(!newWatchLaterState); // Revert optimistic update if there's an error
      showErrorToast('Failed to update Watch Later. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  }, [currentUser, isInWatchLater, isUpdating, mediaId, mediaType, refreshUserData]);

  return { isInWatchLater, toggleWatchLater, isUpdating };
};
