import React, { useState } from 'react';
import './App.css';
import UserInput from './components/user-input/UserInput';
import UserOutput from './components/user-input/UserOutput';
import VideoInput from './components/video/VideoInput';
import Video from './components/video/Video';
import LabelBar from './components/video/LabelBar';
import ProjectInfo from './components/project-info/ProjectInfo';
import ProjectMapping from './components/project-info/ProjectMapping';
import './components/project-info/ProjectInfo.css'

function App() {
  const [userInput, setUserInput] = useState("");
  const [youTubeLink, setYouTubeLink] = useState("");
  const [youTubeTranscript, setYouTubeTranscript] = useState(""); // text : timestamp (start time, end time)
  const [implementationDetails, setImplementationDetails] = useState("");

  return (
    <>
    {youTubeLink == "" || userInput == "" ? (
      <div>
      <h1 className="mainHeading">EduFlex</h1>
      <h2>Projects Made Easy</h2>
      <div className="inputs">
         <UserInput setUserInput={setUserInput}/>
         <VideoInput setYouTubeLink={setYouTubeLink} setYouTubeTranscript={setYouTubeTranscript} />
      </div>
      </div>
    ) : (
      <div>
        <h1 className="smallHeading">EduFlex</h1>
        <div className="inputAndVideo">
          <ProjectInfo userInput={userInput} implementationDetails={implementationDetails} setImplementationDetails={setImplementationDetails}/>
          <Video youTubeLink={youTubeLink} />
          <ProjectMapping youTubeTranscript={youTubeTranscript} implementationDetails={implementationDetails}/>
        </div>
        <UserOutput userInput={userInput} />
        <LabelBar youTubeLink={youTubeLink}/>
        
        
      </div>
    )}
   </>
  );
}

export default App;
