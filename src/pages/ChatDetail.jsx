import React, { useEffect, useRef, useState } from 'react';
import { connectSocket, disconnectSocket } from '../utils/echo';
import { BsSend } from 'react-icons/bs';
import '../styles/chatdetails.css'; // Make sure this CSS file exists
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ChatDetail = () => {
  // const ChatDetail = ({ token, myProfileId:64 }) => {
  const [messages, setMessages] = useState([""]);
  const [isConnected, setIsConnected] = useState(false);
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [newMessage, setNewMessage] = useState('');
    const authToken = localStorage.getItem("fillInToken")
    const myProfileId  = localStorage.getItem("profileId");
    console.log("myProfileId", myProfileId);
    
const { state } = useLocation();
const message = state?.message;
console.log("message",message);
// { token, myProfileId , recruiter_id}



useEffect(() => {
  const fetchChatHistory = async () => {
    try {
      // 1. Fetch Chat History
      const response = await axios.get(
        `https://fillin-admin.cyberxinfosolution.com/api/candidate/chat-history/${message?.recruiterId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data?.status === 'success') {
        const formatted = [];

        (response.data.data || []).forEach((item, index) => {
          if (item.datelabel) {
            formatted.push({
              id: `label-${index}`,
              type: 'label',
              label: item.datelabel,
            });
          } else {
            formatted.push({
              id: `msg-${index}`,
              type: 'message',
              content: item.message,
              time: item.time,
              isMe: item.msgStatus === 'send',
            });
          }
        });

        setMessages(formatted.reverse());
      } else {
        console.warn('Chat history fetch failed:', response.data);
      }
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  };

  const markMessagesAsRead = async () => {
    try {
      await axios.get(
        `https://fillin-admin.cyberxinfosolution.com/api/candidate/chat/mark-as-read/${message?.recruiterId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Marked as read");
    } catch (err) {
      console.error("Failed to mark messages as read", err);
    }
  };

  if (authToken && message?.recruiterId) {
    fetchChatHistory();
    markMessagesAsRead();
  }
}, [authToken, myProfileId, message?.recruiterId]);

const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  const handleSendMessage = async () => {
  if (!newMessage.trim() || !isConnected) {
    alert(
      !isConnected
        ? 'Waiting for connection...'
        : 'Message cannot be empty'
    );
    return;
  }
  // angle

  const tempMessage = {
    id: Date.now().toString(),
    senderId: myProfileId,
    content: newMessage,
    timestamp: formatTime(new Date()),
    // timestamp: new Date().toISOString(),
    isMe: true,
    status: 'sending',
  };

  try {
    // Optimistically render message
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage('');
    // scrollToBottom();

    
    // Send message via API
    const response = await axios.post('https://fillin-admin.cyberxinfosolution.com/api/candidate/chat', {
      recruiter_id:message?.recruiterId, // You can make this dynamic
      // candidate_id: 40, // You can make this dynamic
      message: newMessage,
    },
  { headers: {
      timeout: 10000,
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "Accept": "application/json",
        "Timezone": "Asia/Kolkata"
      },}
  );
     
    // Update message to 'sent'
    if (response.data?.status === 'success') {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    } else {
      throw new Error('Message not sent');
    } 
  } catch (error) {
    console.error('Failed to send message:', error);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === tempMessage.id ? { ...msg, status: 'failed' } : msg
      )
    );
    alert('Failed to send message. Please try again.');
  }
};

  const messagesEndRef = useRef(null);

  useEffect(() => {
    connectSocket({
      myProfileId,
      // token:`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGwtaW4uY3liZXJ4aW5mb3NvbHV0aW9uLmNvbS9hcGkvY2FuZGlkYXRlL2xvZ2luIiwiaWF0IjoxNzUwNzcyODE4LCJleHAiOjE3NTMzNjQ4MTgsIm5iZiI6MTc1MDc3MjgxOCwianRpIjoiVThxRHdRQlFIamlETFRWZCIsInN1YiI6IjY0IiwicHJ2IjoiODYxYjA1NjMxMDkxMzU3ZWM4ZTU1ZjJhZjE3ZTExMThmNzJmNzBkYyJ9.gKFDWJ2-6SI9Mm56G2bh1F3JcL4xKSkMx72TbuPKrzY`,
      token:authToken,
      setMessages,
      setIsConnected,
      setSocketStatus,
    });

    return () => {
      disconnectSocket();
    };
  }, [myProfileId]);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Assuming sendMessage function sends to socket backend
    handleSendMessage({
    // sendMessage({
      content: newMessage,
      senderId: myProfileId,
    });

    setNewMessage('');
  };

  return (
    <div className="chat-detail-container">
      <div className="chat-header">
        <img className="avatar" src={message.profile || "https://i.pravatar.cc/40"} alt="Doctor" />
        <div>
          <h6>{message.sender}</h6>
          <span className="online-dot">● {socketStatus}</span>
        </div>
      </div>

      <div className="chat-body">
       {messages.map((msg) => {
  if (msg.type === 'label') {
    return (
      <div key={msg.id} className="chat-date-divider">
        {msg.label}
      </div>
    );
  }

  return (
    <div key={msg.id} className={`chat-message ${msg.isMe ? 'sent' : 'received'}`}>
      <div className="message-bubble">
        <p>{msg.content}</p>
        <span className="time">{msg.time}</span>
      </div>
    </div>
  );
})}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Start Typing"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} disabled={!newMessage.trim()}>
          <BsSend />
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
