import { implementationMappings } from '.././services/implementationMappings.js';

function ProjectMapping({youTubeTranscript, youTubeLink, implementationDetails }) { // youTubeTranscript {text : timestamp (start time, end time)}
  // do the mapping between implementation details and the youTubeTranscript text
  await implementationMappings(implementationDetails, youTubeLink, youTubeTranscript)

  // represent the text
  return (
    
  );
}

export default ProjectMapping;