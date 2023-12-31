// src/components/ChatForm.tsx

import React, { useState, useEffect } from 'react';

interface ChatFormProps {
    roomName: string;
}

const ChatForm: React.FC<ChatFormProps> = ({ roomName }) => {
    const [message, setMessage] = useState<string>('');
    const [chatLog, setChatLog] = useState<string[]>([]);

    // const socket = new WebSocket(`ws://${window.location.host}/ws/chat/${roomName}/`);
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);

    useEffect(() => {
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setChatLog((prevChatLog) => [...prevChatLog, data.message]);
        };

        socket.onclose = (event) => {
            console.error('WebSocket closed:', event);
        };

        return () => {
            socket.close();
        };
    }, [roomName]);

    const sendMessage = () => {
        socket.send(JSON.stringify({ message }));
        setMessage('');
    };

    return (
        <div>
            <h2>Chat Room: {roomName}</h2>
            <div>
                {chatLog.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatForm;
