import React, { useState } from 'react';
import './App.css';
import UserInput from './user-input/UserInput';
import UserOutput from './user-input/UserOutput';
import VideoInput from './video/VideoInput';
import Video from './video/Video';
import LabelBar from './video/LabelBar';
import ProjectInfo from './project-info/ProjectInfo';
import ProjectMapping from './project-info/ProjectMapping';


function App() {
  const [userInput, setUserInput] = useState("");
  const [youTubeLink, setYouTubeLink] = useState("");
  const [youTubeTranscript, setYouTubeTranscript] = useState({}); // text : timestamp (start time, end time)
  const [implementationDetails, setImplementationDetails] = useState("");

  return (
    <div className="App">
      <UserInput setUserInput={setUserInput}/>
      <UserOutput userInput={userInput} />
      <VideoInput setYouTubeLink={setYouTubeLink} setYouTubeTranscript={setYouTubeTranscript} />
      <Video youTubeLink={youTubeLink}/>
      <LabelBar youTubeLink={youTubeLink}/>
      <ProjectInfo userInput={userInput} implementationDetails={implementationDetails} setImplementationDetails={setImplementationDetails}/>
      <ProjectMapping youTubeLink={youTubeLink} youTubeTranscript={youTubeTranscript} implementationDetails={implementationDetails}/>
    </div>
  );
}

export default App;
