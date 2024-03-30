import './App.css';
import UserInput from './user-input/UserInput';
import UserOutput from './user-input/UserOutput';
import VideoInput from './video/VideoInput';
import Video from './video/Video';
import LabelBar from './video/LabelBar';
import ProjectInfo from './project-info/ProjectInfo';
import ProjectMapping from './project-info/ProjectMapping';


function App() {
  return (
    <div className="App">
      <UserInput/>
      <UserOutput/>
      <VideoInput/>
      <Video/>
      <LabelBar/>
      <ProjectInfo/>
      <ProjectMapping/>
    </div>
  );
}

export default App;
