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
import data from '../src/data.json'
import data2 from '../src/todo.json'

function App() {
  const [userInput, setUserInput] = useState("");
  const [youTubeLink, setYouTubeLink] = useState("");
  const [youTubeTranscript, setYouTubeTranscript] = useState(""); // text : timestamp (start time, end time)
  const [implementationDetails, setImplementationDetails] = useState("");
  const segments = data2;



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
      <div className= "mainContent">
        <h1 className="smallHeading">EduFlex/{userInput}</h1>
        <div className="inputAndVideo">
          <ProjectInfo userInput={userInput} implementationDetails={implementationDetails} setImplementationDetails={setImplementationDetails}/>
          <Video youTubeLink={youTubeLink} />
          <ProjectMapping youTubeTranscript={youTubeTranscript} implementationDetails={implementationDetails}/>
        </div>
        <LabelBar youTubeLink={youTubeLink} segments = {segments}/>
      </div>
    )}
   </>
  );
}

export default App;
