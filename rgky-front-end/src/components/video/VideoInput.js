import { useState } from 'react';
import { getTranscript } from '../../services/getTranscript';
import '../inputs.scss';

function VideoInput({ setYouTubeLink, setYouTubeTranscript }) {
    const [link, setLink] = useState("");
    const [transcript, setTranscript] = useState("");
    const handleInputChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmission = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        setYouTubeLink(link);
        try {
            const response = await getTranscript(link); // Assuming this returns an object
            // Handle the response according to your application's needs
            if (response) {
                setTranscript(response);
                setYouTubeTranscript(response);
            } else {
                setTranscript("Transcript not available.");
            }
        } catch (error) {
            console.error("Failed to fetch transcript:", error);
            setTranscript("Failed to load transcript. Please try again later.");
        }
    };

    return (
        <div className="container">
            <div class="input-group">
                <label class="input-group__label" for="myInput">Enter A Youtube URL</label>
                <input type="text" id="myInput" class="input-group__input" value = {link} onChange = {handleInputChange}></input>
            </div>
            <button onClick={handleSubmission} className="button">Get Transcript</button>
            {/* Display transcript or error message */}
            
        </div>
    );
}

export default VideoInput;
