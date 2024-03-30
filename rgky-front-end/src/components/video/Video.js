import React from 'react';
import getId from '../../services/getId';

function Video({ youTubeLink }) { // Changed 'link' to 'youTubeLink'
  // Check if youTubeLink is empty and return null to render nothing
  if (!youTubeLink) {
    return null;
  }

  // Use getId to extract the video ID. Ensure getId handles undefined input gracefully.
  const videoId = getId(youTubeLink); // Changed 'link' to 'youTubeLink'

  // Optional: Check if videoId is null or undefined and return an error message or placeholder
  if (!videoId) {
    return <div>Invalid or missing YouTube link.</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-responsive">
      <iframe
        width="560"
        height="315"
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      ></iframe>
    </div>
  );
}

export default Video;
