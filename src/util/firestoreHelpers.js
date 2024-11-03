import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/config"; // Ensure you have the Firebase config here


async function toggleLikeMedia(mediaId, mediaType, isLiked, currentUser) {
  console.log(mediaId);
  if (!currentUser) return;

  const userRef = doc(db, "users", currentUser.uid);

  let field = "";

  // Determine which field to update based on the mediaType
  switch (mediaType) {
    case "movie":
      field = "likedMovies";
      break;
    case "tv":
      field = "LikedTvShows";
      break;
    case "actor":
      field = "likedActors";
      break;
    default:
      return;
  }

  try {
    // Add or remove the media ID from the Firestore array
    if (isLiked) {
      await updateDoc(userRef, {
        [field]: arrayRemove(mediaId) // Remove media ID if unliked
      });
    } else {
      await updateDoc(userRef, {
        [field]: arrayUnion(mediaId) // Add media ID if liked
      });
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
export default toggleLikeMedia;
