import React, { useState } from "react";
import { FaHeart, FaBookmark, FaStar, FaBars } from "react-icons/fa";
import IconButton from "./IconButton";
import { useLikes } from "../hooks/useLikes";
import { useWatchLater } from "../hooks/useWatchLater";  // Import useWatchLater hook
import { useAuth } from "../contexts/AuthContext";
import { showErrorToast } from '../util/toast';

const InteractiveButtons = ({ mediaId, mediaType }) => {
  const { currentUser } = useAuth();
  const { isLiked, toggleLike, isUpdating: isLikeUpdating } = useLikes(mediaId, mediaType);
  const { isInWatchLater, toggleWatchLater, isUpdating: isWatchLaterUpdating } = useWatchLater(mediaId, mediaType);
  const [rated, setRated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inActiveClassStyle = "bg-gray-100 text-gray-600 hover:bg-gray-200";

  const handleLikeClick = () => {
    if (currentUser) {
      toggleLike();
    } else {
      showErrorToast('Please log in to like media.');
    }
  };

  const handleWatchLaterClick = () => {
    if (currentUser) {
      toggleWatchLater();
    } else {
      showErrorToast('Please log in to add to Watch Later.');
    }
  };

  return (

    <div className="flex justify-left space-x-2 my-4">
      <IconButton
        onClick={handleLikeClick}
        isActive={isLiked}
        activeClass="bg-red-400 text-white"
        inactiveClass={inActiveClassStyle}
        Icon={FaHeart}
        disabled={isLikeUpdating}
      />
      {mediaType!="person" &&
      <IconButton
        onClick={handleWatchLaterClick}
        isActive={isInWatchLater}
        activeClass="bg-blue-400 text-white"
        inactiveClass={inActiveClassStyle}
        Icon={FaBookmark}
        disabled={isWatchLaterUpdating}
      />
}
      <IconButton
        onClick={() => setRated(!rated)}
        isActive={rated}
        activeClass="bg-yellow-500 text-white"
        inactiveClass={inActiveClassStyle}
        Icon={FaStar}
      />
      <IconButton
        onClick={() => setMenuOpen(!menuOpen)}
        isActive={false}
        activeClass="bg-gray-200"
        inactiveClass={inActiveClassStyle}
        Icon={FaBars}
      />
    </div>
  );
};

export default InteractiveButtons;
