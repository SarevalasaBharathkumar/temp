import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import './ImageCard.css';

const ImageCard = ({ image1 }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadImage = (imageUrl) => {
    return new Promise((resolve) => {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "image.jpg"; // You can change the file name if you want
      link.onload = () => resolve();
      link.click();
      resolve();
    });
  };

  const handleInstagramShare = async (imageUrl) => {
    setIsDownloading(true);
    try {
      await downloadImage(imageUrl);
      setIsDownloading(false);

      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // iOS devices
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        const instagramUrl = `instagram://story-camera`;
        window.location.href = instagramUrl;
      }
      // Android devices
      else if (/android/i.test(userAgent)) {
        const instagramUrl = `intent://story-camera#Intent;package=com.instagram.android;scheme=instagram;end`;
        window.location.href = instagramUrl;
      } 
      // Fallback for non-mobile devices
      else {
        alert("This feature is only available on mobile devices with Instagram installed.");
      }
    } catch (error) {
      console.error("Error downloading the image:", error);
      setIsDownloading(false);
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
          <div className="loading-spinner"></div> // Add a loading spinner during download
        ) : (
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        )}
      </button>
    </div>
  );
};

export default ImageCard;
