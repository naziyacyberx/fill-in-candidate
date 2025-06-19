import { useState } from "react";
import { FaSearch, FaEnvelopeOpen, FaEnvelope, FaBan } from "react-icons/fa";
import "../styles/messages.css";
import Navbar from "../sections/common/Navbar";
import Footer from "../sections/common/Footer";

const messagesData = [
  {
    id: 1,
    sender: "Dental Care Clinic",
    time: "2h ago",
    text: "Has viewed your application",
    read: true,
  },
  {
    id: 2,
    sender: "Job Alert",
    time: "4h ago",
    text: "New job alert: senior dentist position at Bright Smile Dental",
    read: false,
  },
  {
    id: 3,
    sender: "Dr. Sarah Wilson",
    time: "1 day ago",
    text: "Thanks for your interest in our clinic. We’d love to schedule an interview with you!",
    read: false,
  },
  {
    id: 4,
    sender: "Bright Smile Dental",
    time: "2 days ago",
    text: "Interview Invitation for senior Dental Position",
    read: true,
  },
  {
    id: 5,
    sender: "Dr. Michael Chen",
    time: "2 days ago",
    text: "I saw your profile and I think you would be a great fit for our Practice.",
    read: true,
  },
  {
    id: 6,
    sender: "Dental Care Clinic",
    time: "3 days ago",
    text: "I saw your profile and I think you would be a great fit for our Practice.",
    read: true,
  },
];

const Messages = () => {
  const [filter, setFilter] = useState("all");

  const filteredMessages = messagesData.filter((msg) => {
    if (filter === "read") return msg.read;
    if (filter === "unread") return !msg.read;
    return true;
  });

  return (
    <>
            <Navbar />
    
    <div className="messages-container">
      <h3>Messages</h3>
      <div className="search-bar d-flex flex-row ">
        <div>

        <FaSearch />
        </div>

        <div>
        <input type="text" placeholder="Search Message" />

        </div>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
          All
        </button>
        <button onClick={() => setFilter("read")} className={filter === "read" ? "active" : ""}>
          Read
        </button>
        <button onClick={() => setFilter("unread")} className={filter === "unread" ? "active" : ""}>
          Unread
        </button>
        <button onClick={() => setFilter("blocked")}>
          Blocked
        </button>
      </div>

      <div className="message-list">
        {filteredMessages.map((msg) => (
          <div key={msg.id} className={`message-item ${msg.read ? "read" : "unread"}`}>
            <div className="message-icon">{msg.read ? <FaEnvelopeOpen /> : <FaEnvelope />}</div>
            <div className="message-info">
              <div className="message-header">
                <span className="sender">{msg.sender}</span>
                <span className="time">{msg.time}</span>
              </div>
              <p className="text">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <Footer/>
    </>
  );
};

export default Messages;
