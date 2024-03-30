import React, { useEffect, useState } from 'react';
import { implementationMappings } from '.././services/implementationMappings.js';

function ProjectMapping({youTubeTranscript, implementationDetails }) { // youTubeTranscript {text : timestamp (start time, end time)}
  const [mapping, setMapping] = useState([]); // [subSetImplementationText: (timeStamp) ]

  useEffect(() => {
    const handleMapping = async () => {
      const mapping = await implementationMappings(implementationDetails,youTubeTranscript) // [ (subSetImplementationText, [start_time, end_time] ) ]
      setMapping(mapping)
    };

    handleMapping();
  }, [youTubeTranscript, implementationDetails]);

  // represent the text
  return (
    <div>
      {mapping.map(([text, timestamp]) => (
        <div>
          {text}: {timestamp}
        </div>
      ))}
    </div>
  );
}

export default ProjectMapping;