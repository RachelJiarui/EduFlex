import React, { useState } from 'react';
import '../inputs.scss';

function UserInput({ setUserInput }) {
    const [topic, setTopic] = useState("");

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserInput(topic);
    };

    return (
        <div className="container">
            <div class="input-group">
                <label class="input-group__label" for="myInput">Enter A Topic</label>
                <input type="text" id="myInput" class="input-group__input" value = {topic} onChange = {handleTopicChange}></input>
            </div>
            <button onClick={handleSubmit} className="button">Get Topic</button>
        </div>
    );
}

export default UserInput;
