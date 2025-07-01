import React, { useEffect, useState } from 'react';
import { connectSocket, disconnectSocket } from '../utils/echo';

const ChatComponent = ({ token, myProfileId }) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socketStatus, setSocketStatus] = useState('disconnected');

  useEffect(() => {
    connectSocket({
      myProfileId,
      token,
      setMessages,
      setIsConnected,
      setSocketStatus,
    });

    return () => {
      disconnectSocket();
    };
  }, [myProfileId, token]);

  return (
    <div>
      <h4>Socket Status: {socketStatus}</h4>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.isMe ? 'Me' : 'Recruiter'}:</strong> {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatComponent;
