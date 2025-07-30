import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaUserCircle, FaVideo } from "react-icons/fa";
import "../../styles/recruiter/scheduleinterview.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/BaseUrl";

const ScheduleInterview = () => {
  const location = useLocation();
  const navigate = useNavigate()
    const candidateId = location.state?.user?.id; // fallback
  // const jobId = location.state?.job_id;
  const jobId = location.state?.job_id ?? null;
  console.log("state",location.state);
  const user = location?.state?.user
//   const candidateId = location.state?.candidate_id; // fallback
//   const jobId = location.state?.job_id; // fallback

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [notes, setNotes] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      candidate_id: candidateId,
      job_id: jobId || 1,
      date,
      time,
      end_time: endTime,
      link: meetingLink,
      notes,
    };

    try {
      const res = await axios.post(
        `${baseUrl}recruiter/schedule-interview`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("recruiterToken")}`,
          },
        }
      );

      toast.success("Interview scheduled successfully!");
    navigate("/recruiter/scheduled-interviews")
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "90%" }}>
      <h5><strong>Schedule Interview </strong></h5>

      <Card className="p-3 mt-3 shadow-sm">
        <div className="d-flex align-items-center">
          <FaUserCircle size={50} className="text-secondary me-3" />
          <div>
            <h6 className="mb-0">
            {user.name} <span className="text-primary">✔</span>
            </h6>
            <div className="text-muted small">{user?.title}...</div>
            <div className="text-warning small" onClick={()=>{navigate("/recruiter/ratings-and-reviews")}}>★ View review</div>
          </div>
        </div>
      </Card>

      {/* Timing Section */}
      <div className="mt-4">
        <h6><FaCalendarAlt className="me-2 text-primary" />Timing</h6>
        <Form.Group className="mt-3">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Select start Time</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>
      </div>
      <Form.Group className="mt-3">
  <Form.Label>Select End Time</Form.Label>
  <Form.Control
    type="time"
    value={endTime}
    onChange={(e) => setEndTime(e.target.value)}
  />
</Form.Group>


      {/* Additional Details */}
      <div className="mt-4">
        <h6><FaVideo className="me-2 text-primary" />Additional Details</h6>
        <Form.Group className="mt-3">
          <Form.Label>Meeting Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meeting link"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Additional Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Any Specific Concerns?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
      </div>

      <Button
        variant="primary"
        type="submit"
        className="mt-4 w-100 gradient-button"
        onClick={handleSubmit}
      >
        Scheduled Meeting
      </Button>
    </div>
  );
};

export default ScheduleInterview;
