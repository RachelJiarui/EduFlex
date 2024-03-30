async function getTranscript(youTubeLink) {
    const match = youTubeLink.match(/v=([^&]+)/);
    const videoId = match ? match[1] : null;
    const url = `http://localhost:8000/get-youtube-transcript-with-timestamp/<video_id>?video_id=${videoId}`; // Update the URL as needed
    console.log(url)
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error("Failed to fetch item:", error);
    }
  }
    