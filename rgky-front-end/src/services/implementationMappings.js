export async function implementationMappings(implementationText,transcript) { // transcript (text, timestamp)
   // parse the implementation details (retrieve headers/numbered steps)
   const headers = extractHeaders(implementationText);
   // const THRESHOLD = 0.85;

   // give the back end the headers and the transcript

} // [ subSetImplementationText: (timeStamp) ]

function extractHeaders(text) {
  const headers = text.split('\n');
  return headers;
}