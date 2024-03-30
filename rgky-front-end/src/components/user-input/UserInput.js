import React, { useState } from 'react';
import './UserInput.css';

function UserInput({ setUserInput }) {

    const handleSubmit = (event) => {
        event.preventDefault();
      
        const inputFieldValue = event.target.elements.inputField.value;

        setUserInput(inputFieldValue);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <label htmlFor="inputField">Enter a field of interest:</label><br />
                <div class = "input">      
                    <input type="text" id="inputField" name="inputField" placeholder='Enter topic of choice' /><br /><br />
                    <button type="submit">Submit</button>
                </div> 
            </form>
        </div>
    );
}

export default UserInput;
