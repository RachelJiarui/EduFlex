import React, { useState } from 'react';

function VideoInput() {
    const [link,setLink] = useState("");
    return(
        <div>
            <input placeholder="Enter youtube url" value></input>
        </div>
    );
}

export default VideoInput;