import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import './ImageCard.css'; // Make sure to create and include this CSS file

const ImageCard = ({ image1 }) => {
  const handleInstagramShare = (imageUrl) => {
    // Create an anchor element and simulate a download
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "image.jpg"; // You can set a custom filename here
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Detect the user's device
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Redirect to Instagram Story camera
    setTimeout(() => {
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        const instagramUrl = `instagram://camera`;
        window.location.href = instagramUrl;
      } else if (/android/i.test(userAgent)) {
        const instagramUrl = `intent://camera#Intent;package=com.instagram.android;scheme=instagram;end`;
        window.location.href = instagramUrl;
      } else {
        alert("This feature is only available on mobile devices with Instagram installed.");
      }
    }, 1000); // Wait for the download to complete before redirecting
  };

  return (
    <div className="image-card">
      <div className="image-container">
        <img src={image1} alt="/" className="card-image" />
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
