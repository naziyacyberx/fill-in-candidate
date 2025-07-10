import React, { useState } from "react";
import { Form, InputGroup, Button, Image, Badge } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const messagesMock = [
  {
    id: 1,
    sender: "Dental Care Clinic",
    message: "Has viewed your application",
    time: "2h ago",
    avatar: "https://via.placeholder.com/50",
    status: "read",
  },
  {
    id: 2,
    sender: "Job Alert",
    message: "New match senior dentist position at bright smile dental",
    time: "4h ago",
    avatar: "https://via.placeholder.com/50",
    status: "read",
  },
  {
    id: 3,
    sender: "Dr. Sarah Wilson",
    message: "Thanks for your interest in our clinic...",
    time: "1 day ago",
    avatar: "https://via.placeholder.com/50",
    status: "unread",
  },
  {
    id: 4,
    sender: "Bright Smile Dental",
    message: "Interview Invitation for Senior Dentist Position",
    time: "2 days ago",
    avatar: "https://via.placeholder.com/50",
    status: "read",
  },
  {
    id: 5,
    sender: "Dr. Michael Chen",
    message: "Hi, I saw your profile and think you'd be a great fit...",
    time: "2 days ago",
    avatar: "https://via.placeholder.com/50",
    status: "read",
  },
  {
    id: 6,
    sender: "Dental Care Clinic",
    message: "Hi, I saw your profile and think you'd be a great fit...",
    time: "3 days ago",
    avatar: "https://via.placeholder.com/50",
    status: "read",
  },
];

const Messages = () => {
  const [filter, setFilter] = useState("All");

  const filteredMessages =
    filter === "All"
      ? messagesMock
      : messagesMock.filter((msg) => msg.status === filter.toLowerCase());

  const tabs = ["All", "Read", "Unread", "Blocked"];

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <h5><strong>Messages</strong></h5>

      {/* Search Input */}
      <InputGroup className="my-3">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control placeholder="Search Message" />
      </InputGroup>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={filter === tab ? "primary" : "outline-primary"}
            className="rounded-pill px-3 py-1"
            onClick={() => setFilter(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Message List */}
      {filteredMessages.map((msg) => (
        <div
          key={msg.id}
          className={`d-flex align-items-start p-3 rounded border mb-2 ${
            msg.status === "unread" ? "border-primary bg-light" : "bg-white"
          }`}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={msg.avatar}
            roundedCircle
            width={50}
            height={50}
            className="me-3"
          />
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <div>
                <span className="fw-bold">{msg.sender}</span>{" "}
                <Badge bg="primary" className="ms-1">✔</Badge>
              </div>
              <small className="text-muted">{msg.time}</small>
            </div>
            <div className="text-muted small">{msg.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
