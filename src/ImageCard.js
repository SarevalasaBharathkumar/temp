import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import './ImageCard.css'; // Make sure to create and include this CSS file

const ImageCard = ({ image1 }) => {
  const handleInstagramShare = (imageUrl) => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // iOS devices
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      const instagramUrl = `instagram://camera`;
      window.location.href = instagramUrl;
    }
    // Android devices
    else if (/android/i.test(userAgent)) {
      const instagramUrl = `intent://camera#Intent;package=com.instagram.android;scheme=instagram;end`;
      window.location.href = instagramUrl;
    } 
    // Fallback for non-mobile devices
    else {
      alert("This feature is only available on mobile devices with Instagram installed.");
    }
  };

  return (
    <div className="image-card">
      <div className="image-container">
        <img src={image1} alt="Image 1" className="card-image" />
      </div>
      <button
        className="instagram-button"
        onClick={() => handleInstagramShare(image1)}
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </button>
    </div>
  );
};

export default ImageCard;
