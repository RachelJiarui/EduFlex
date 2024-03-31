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
        for (const item in m) {
          dictM[item[0]] = item[1]
        }
        const listM = Object.entries(dictM);
        setMapping(listM)
      } else {
        console.log("Did not update mapping")
      }
    };
  
    handleMapping();
  }, [youTubeTranscript, implementationDetails]);

  // represent the text
  return (
    <>
    {youTubeTranscript.length !== 0 && implementationDetails !== "" && mapping ? (
      <div className="gptOutput">
        {mapping.map(([text, timestamp]) => (
          <div key={timestamp}>
            {text}: {timestamp}
          </div>
        ))}
      </div>
    ) : (
      <div>Hi mapping</div>
    )}
  </>
  );
}

export default ProjectMapping;