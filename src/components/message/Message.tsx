import React from 'react'
import './message.css'

interface MessageProps {
    message: string,
    type: 'error' | 'success'
}

export default function Message({ message, type }: MessageProps) {
    
    return (
        <div className={`message ${type}`}>
            {message}
        </div>
    );
};
