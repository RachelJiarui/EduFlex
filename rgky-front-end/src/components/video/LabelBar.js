import React, { useState, useRef} from 'react';
import './LabelBar.css';

const LabelBar = ({ youTubeLink, segments}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const videoRef = useRef(null);

  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const seekTo = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const colors = ['#96A3D3', '#D79B27', '#047123', '#D396AC', '#561960', '#129890', '#E1810F', '#9F160D', '9ED396', '#7271A6'];

  const handleSegmentHover = (segment) => {
    setHoveredSegment(segment);
  };

  const totalDuration = segments.reduce((acc, segment) => acc + (segment.end - segment.start), 0);

  return (
    <div className="label-bar-container" style={{ width: '600px' }}>
      {youTubeLink && (
        <div className="label-bar">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="segment"
              style={{
                width: `${((segment.end - segment.start) / totalDuration) * 100}%`,
                backgroundColor: colors[index % colors.length] // Assign colors sequentially from the array
              }}
              onMouseEnter={() => handleSegmentHover(segment)}
              onMouseLeave={() => handleSegmentHover(null)}
              onClick={() => seekTo(segment.start)}
            >
              {hoveredSegment === segment && (
                <div className="tooltip">
                  <div>Duration: {formatTime(segment.end - segment.start)}</div>
                  <div>{segment.gist}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabelBar;
