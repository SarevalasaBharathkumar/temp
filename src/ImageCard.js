import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import './ImageCard.css';

const ImageCard = ({ image1 }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleInstagramShare = async (imageUrl) => {
    setIsDownloading(true);

    // Download the image
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link to download the image
      const link = document.createElement("a");
      link.href = url;
      link.download = "image.jpg";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

      setIsDownloading(false);

      // Open Instagram story camera
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        const instagramUrl = `instagram://story-camera`;
        window.location.href = instagramUrl;
      } else if (/android/i.test(userAgent)) {
        const instagramUrl = `intent://story-camera#Intent;package=com.instagram.android;scheme=instagram;end`;
        window.location.href = instagramUrl;
      } else {
        alert("This feature is only available on mobile devices with Instagram installed.");
      }

    } catch (error) {
      setIsDownloading(false);
      alert("Failed to download the image. Please try again.");
    }
  };

  return (
    <div className="image-card">
      <div className="image-container">
        <img src={image1} alt="/" className="card-image" />
      </div>
      <button
        className="instagram-button"
        onClick={() => handleInstagramShare(image1)}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <div className="loading-animation">Downloading...</div>
        ) : (
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        )}
      </button>
    </div>
  );
};

export default ImageCard;
