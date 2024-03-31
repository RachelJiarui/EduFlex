export async function implementationMappings(implementationText,transcript) { // transcript [{text: _, time: [start_time, end_time]}]
  // implementationText - the GPT response we received, all the bullet points in a single string
  // transcript - array of {text: _, time: [start_time, end_time]}
  const url = `http://localhost:8000/implementation_mappings/<implementation_text>?implementation_text=${implementationText}/<transcript>=${transcript}`;
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
}