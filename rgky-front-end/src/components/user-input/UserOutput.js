import React from 'react';
import '../user-input/UserOutput.css'
function UserOutput({ userInput}) {
    return (
        <div>
            <p>User Output: {userInput} </p>
        </div>
    );
}

export default UserOutput;
