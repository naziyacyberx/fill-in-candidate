import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Spinner } from "react-bootstrap";
import { FaCalendarAlt, FaVideo, FaUserMd } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const filters = ["All", "Upcoming", "Completed", "Expired", "Today"];

const getStatusVariant = (status) => {
  switch (status) {
    case "Upcoming":
      return "primary";
    case "Completed":
      return "success";
    case "Expired":
      return "danger";
    case "Today":
      return "warning";
    default:
      return "secondary";
  }
};

const ScheduledInterviews = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [markingId, setMarkingId] = useState(null);
  const navigate = useNavigate()

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://fillin-admin.cyberxinfosolution.com/api/recruiter/interview-list",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGxpbi1hZG1pbi5jeWJlcnhpbmZvc29sdXRpb24uY29tL2FwaS9yZWNydWl0ZXIvbG9naW4iLCJpYXQiOjE3NTIyMjc0MjcsImV4cCI6MTc1NDgxOTQyNywibmJmIjoxNzUyMjI3NDI3LCJqdGkiOiJZMjY5b3pxSXY1RjdtcTRwIiwic3ViIjoiNjMiLCJwcnYiOiIxOWU0M2I5N2YyMDI5ZTUzMDcyMzIwYzRjNzdjOTBkMTViMmMzM2ZkIn0.43eywrXj1GX9zhAhOLU1zQtytCnhuDM5Z9zg7EMHous`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        setInterviews(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      setMarkingId(id);
      const response = await axios.post(
        `https://fillin-admin.cyberxinfosolution.com/api/recruiter/complete-interview/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGxpbi1hZG1pbi5jeWJlcnhpbmZvc29sdXRpb24uY29tL2FwaS9yZWNydWl0ZXIvbG9naW4iLCJpYXQiOjE3NTIyMjc0MjcsImV4cCI6MTc1NDgxOTQyNywibmJmIjoxNzUyMjI3NDI3LCJqdGkiOiJZMjY5b3pxSXY1RjdtcTRwIiwic3ViIjoiNjMiLCJwcnYiOiIxOWU0M2I5N2YyMDI5ZTUzMDcyMzIwYzRjNzdjOTBkMTViMmMzM2ZkIn0.43eywrXj1GX9zhAhOLU1zQtytCnhuDM5Z9zg7EMHous`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        // Refetch interviews or update state
        fetchInterviews();
      }
    } catch (error) {
      console.error("Failed to mark interview complete:", error);
    } finally {
      setMarkingId(null);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const filtered =
    activeFilter === "All"
      ? interviews
      : interviews.filter((item) => item.type === activeFilter);

  return (
    <div className="container py-4">
      <h5><strong>Scheduled Interview</strong></h5>

      {/* Filter Buttons */}
      <div className="d-flex flex-wrap gap-2 my-3">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "primary" : "outline-primary"}
            className="rounded-pill px-3 py-1"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {filtered.length === 0 ? (
            <p className="text-muted">No interviews found.</p>
          ) : (
            filtered.map((item) => (
              <div className="col-md-6 mb-3" key={item.id}>
                <Card className="p-3 shadow-sm border">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="text-muted small mb-1">
                        <FaCalendarAlt className="me-1" />
                        {item.date} {item.time}
                      </div>
                      <h6 className="mb-0">{item.candidate}</h6>
                      <div className="text-primary small">{item.clinic}</div>
                      <div className="text-primary small">{item.job_name}</div>
                    </div>
                    <Badge bg={getStatusVariant(item.type)}>{item.type}</Badge>
                  </div>

                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {item.type !== "Completed" && (
                      <span
                        className="border px-2 py-1 rounded small text-muted"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleMarkComplete(item.id)}
                      >
                        {markingId === item.id ? "Marking..." : "Mark Completed"}
                      </span>
                    )}
                    <span className="border px-2 py-1 rounded small text-muted">
                      <FaUserMd className="me-1" /> {item.candidate_profession}
                    </span>
            
                    {item.type === "Upcoming" && (
                      <Button
                        size="sm"
                        variant="outline-primary"
                        href={item.link}
                        target="_blank"
                      >
                        Join Interview
                      </Button>
                    )}
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {item.type !== "Completed" && (
                      <span
                        className="border px-2 py-1 rounded small text-muted"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleMarkComplete(item.id)}
                      >
                        {markingId === item.id ? "Marking..." : "Mark Completed"}   
                      </span>   
                    )}
                    <span className="border px-2 py-1 rounded small text-muted"
                    onClick={()=>{navigate(`/recruiter/candidate-detail/${item.candidate_id}`, {state:{id:item.candidate_id}})}}
                    >
                      {/* <FaUserMd className="me-1" /> */}
                       View Applicant
                    </span>
                    <span className="border px-2 py-1 rounded small text-muted"
                      onClick={()=>{navigate(`/recruiter/job-details/${item.id}`, {state:{id:item.id}})}}
                    >
                      {/* <FaUserMd className="me-1" />       */}
                                        view Job

                    </span>
                         
            
                 
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduledInterviews;
