import React, { useEffect, useState } from 'react';
import { implementationMappings } from '../.././services/implementationMappings.js';
import '../project-info/ProjectInfo.css'
function ProjectMapping({youTubeTranscript, implementationDetails }) { // youTubeTranscript {text : timestamp (start time, end time)}
  const [mapping, setMapping] = useState([]); // [subSetImplementationText: (timeStamp) ]
  useEffect(() => {
    const handleMapping = async () => {
      if (youTubeTranscript !== "" && implementationDetails !== "") {
        const m = await implementationMappings(implementationDetails,youTubeTranscript) // [ (subSetImplementationText, [start_time, end_time] ) ]
        const dictM = {}
        // console.log(m)
        for (let i = 0; i < m.length; i+=1) {
          // console.log(m[i])
          dictM[m[i][0]] = m[i][1]
        }
        // console.log(dictM)
        const listM = Object.entries(dictM);
        // console.log(listM)
        setMapping(listM)
      } else {
        console.log("Did not update mapping")
      }
    };
  
    handleMapping();
  }, [youTubeTranscript, implementationDetails]);

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600); // There are 3600 seconds in an hour
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Remaining seconds divided by 60
    const seconds = Math.floor(totalSeconds % 60); // Remaining seconds

    // Pad the minutes and seconds with leading zeros if needed
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

  // represent the text
  return (
    <>
    {youTubeTranscript.length !== 0 && implementationDetails !== "" && mapping ? (
      <div className="mappingOutput">
        {mapping.map(([text, timestamp]) => (
          <div key={timestamp}>
            {text}
            <br></br>
             {formatTime(timestamp[0])} timestamp
          </div>
        ))}
        <br></br>
      </div>
    ) : (
      <div className="loading">Loading implementation mapping...</div>
    )}
  </>
  );
}

export default ProjectMapping;