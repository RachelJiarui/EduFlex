import React, { useEffect } from 'react';
import { fetchImplementationGPT } from '../.././services/fetchImplementationGPT.js';

function ProjectInfo({ userInput, implementationDetails, setImplementationDetails }) {
  useEffect(() => {
    const handleUserInputChange = async () => {
      const impD = await fetchImplementationGPT(userInput);
      setImplementationDetails(impD);
    };

    handleUserInputChange();
  }, [userInput]);

  return (
    <>
      {userInput !== "" && implementationDetails !== "" ? (
        <div className="gptOutput">
          {implementationDetails}
        </div>
      ) : (
        <div>
          Hi
        </div>
      )}
    </>
  );
}

export default ProjectInfo;