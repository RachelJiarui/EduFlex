export async function fetchImplementationGPT(userInput) {
  // make sure the api requests implementation in the form of bulleted points
  const url = `http://localhost:8000/get-openai-implementation/${userInput}`; // Update the URL as needed
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error("Failed to fetch item:", error);
    }
} // return string

