import getId from '../services/getId'
export async function getTranscript(youTubeLink) {
    let videoId = getId(youTubeLink)
    let data = null;
    const url = `http://localhost:8000/get-youtube-transcript-with-timestamp/${videoId}`; // Update the URL as needed
    console.log(url)
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error("Failed to fetch item:", error);
      return "Error"
    }
    return data
  }
    