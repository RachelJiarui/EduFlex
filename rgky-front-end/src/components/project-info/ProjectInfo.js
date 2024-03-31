import React, { useEffect } from 'react';
import { fetchImplementationGPT } from '../.././services/fetchImplementationGPT.js';
import {marked} from 'marked'
function ProjectInfo({ userInput, implementationDetails, setImplementationDetails }) {
  useEffect(() => {
    const handleUserInputChange = async () => {
      const impD = await fetchImplementationGPT(userInput);
      setImplementationDetails(impD);
    };

    handleUserInputChange();
  }, [userInput]);

  // The marked content must be sanitized to prevent XSS attacks.
  // Assuming `implementationDetails` is a Markdown string.
  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <>
      {userInput !== "" && implementationDetails !== "" ? (
        <div 
          className="gptOutput" 
          // This will safely insert the HTML into your component.
          dangerouslySetInnerHTML={createMarkup(marked.parse(implementationDetails))}
        />
      ) : (
        <div className="loading">Loading proposed implementation...</div>
      )}
    </>
  );
}

export default ProjectInfo;
