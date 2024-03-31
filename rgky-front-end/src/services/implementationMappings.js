export async function implementationMappings(implementationText,transcript) { // transcript [{text: _, time: [start_time, end_time]}]
  const url = `http://localhost:8000/implementation_mappings/`;
  console.log("Sending over: " + JSON.stringify({ implementationText, transcript }))
    try {
  const response = await fetch(url, {
    method: 'POST', // Change to POST method
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ implementationText, transcript }), // Send data in the body
  });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data
      } catch (error) {
        console.error("Failed to fetch item:", error);
      }
}