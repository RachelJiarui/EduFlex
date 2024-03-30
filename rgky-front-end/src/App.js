import React, { useState } from 'react';
import './App.css';
import UserInput from './components/user-input/UserInput';
import UserOutput from './components/user-input/UserOutput';
import VideoInput from './components/video/VideoInput';
import Video from './components/video/Video';
import LabelBar from './components/video/LabelBar';
<<<<<<< HEAD
import ProjectInfo from './components/project-info/ProjectInfo';
=======
import ProjectInfo from './components/project-info/ProjectInfo.js';
>>>>>>> 73faf390d172cf0e375f660c93feb21129567d2b
import ProjectMapping from './components/project-info/ProjectMapping';


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
      <ProjectMapping youTubeTranscript={youTubeTranscript} implementationDetails={implementationDetails}/>
    </div>
  );
}

export default App;
