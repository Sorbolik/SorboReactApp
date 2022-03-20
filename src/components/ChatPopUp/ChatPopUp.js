
import React, { useState, useEffect } from 'react';
import './ChatPopUp.css';

function ChatPopUp({ actualText, index }) {

    const [text, setText] = useState(
        ''
    );

    useEffect(() => {
        setText(actualText)
    }, [])

    return (
        <div className="popup-wrapper" id={index}>
            {
                text
            }
        </div>
    );
}

export default ChatPopUp;
