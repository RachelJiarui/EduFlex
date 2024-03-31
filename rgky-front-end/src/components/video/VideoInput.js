import { useState } from 'react';
import { getTranscript } from '../../services/getTranscript';

function VideoInput({ setYouTubeLink, setYouTubeTranscript }) {
    const [link, setLink] = useState("");
    const [transcript, setTranscript] = useState("");
    let data;
    const handleInputChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmission = async (e) => {
        setYouTubeLink(link);
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            const response = await getTranscript(link); // Assuming this returns an object
            // Assuming the response is an object with a Transcript key
            if (response) {
                setTranscript(response);
                setYouTubeTranscript(response);
                
            } else {
                // Handle cases where the Transcript key might not be present
                setTranscript("Transcript not available.");
            }
        } catch (error) {
            console.error("Failed to fetch transcript:", error);
            setTranscript("Failed to load transcript. Please try again later.");
        }
    };
    

    return (
        <div>
            <input placeholder="Enter YouTube URL" value={link} onChange={handleInputChange}></input>
            <button onClick={handleSubmission}>Get Transcript</button>
        </div>
    );
}

export default VideoInput;
