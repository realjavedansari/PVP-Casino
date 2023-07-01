import React from 'react';

const FullscreenPopup = ({ onClose }) => {
  return (
    <div className="fullscreen-popup">
      <div className="popup-content">
        {/* Add your video element and any other content here */}
        <video autoPlay controls>
          <source src="../videos/rocket.mp4" type="video" />
        </video>
        {/* Add a close button or icon */}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FullscreenPopup;
