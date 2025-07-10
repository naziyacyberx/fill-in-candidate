import React, { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { FaCalendarAlt, FaVideo, FaUserMd } from "react-icons/fa";

const filters = ["All", "Upcoming", "Completed", "Expired", "Today"];

const dummyInterviews = [
  {
    id: 1,
    date: "5 June 2025",
    time: "02:11",
    name: "Dr. John Williams",
    hospital: "Bright Smile Dental Care",
    status: "Upcoming",
    platform: "Video Calling",
    recruiter: "Alina Deox",
  },
  {
    id: 2,
    date: "5 June 2025",
    time: "02:11",
    name: "Dr. John Williams",
    hospital: "Bright Smile Dental Care",
    status: "Completed",
    platform: "Video Calling",
    recruiter: "Alina Deox",
  },
  {
    id: 3,
    date: "5 June 2025",
    time: "02:11",
    name: "Dr. John Williams",
    hospital: "Bright Smile Dental Care",
    status: "Completed",
    platform: "Video Calling",
    recruiter: "Alina Deox",
  },
  {
    id: 4,
    date: "5 June 2025",
    time: "02:11",
    name: "Dr. John Williams",
    hospital: "Bright Smile Dental Care",
    status: "Expired",
    platform: "Video Calling",
    recruiter: "Alina Deox",
  },
  {
    id: 5,
    date: "5 June 2025",
    time: "02:11",
    name: "Dr. John Williams",
    hospital: "Bright Smile Dental Care",
    status: "Today",
    platform: "Video Calling",
    recruiter: "Alina Deox",
  },
  {
    id: 6,
    date: "5 June 2025",
    time: "02:11",
    name: "Dr. John Williams",
    hospital: "Bright Smile Dental Care",
    status: "Upcoming",
    platform: "Video Calling",
    recruiter: "Alina Deox",
  },
];

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

  const filtered = activeFilter === "All"
    ? dummyInterviews
    : dummyInterviews.filter((item) => item.status === activeFilter);

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

      {/* Interview Cards */}
      <div className="row">
        {filtered.map((item) => (
          <div className="col-md-6 mb-3" key={item.id}>
            <Card className="p-3 shadow-sm border">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-1">
                    <FaCalendarAlt className="me-1" />
                    {item.date} {item.time}
                  </div>
                  <h6 className="mb-0">{item.name}</h6>
                  <div className="text-primary small">{item.hospital}</div>
                </div>
                <Badge bg={getStatusVariant(item.status)}>{item.status}</Badge>
              </div>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <span className="border px-2 py-1 rounded small text-muted">
                  <FaVideo className="me-1" /> {item.platform}
                </span>
                <span className="border px-2 py-1 rounded small text-muted">
                  <FaUserMd className="me-1" /> {item.recruiter}
                </span>
                {item.status === "Upcoming" && (
                  <Button size="sm" variant="outline-primary">
                    Mark As Read
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledInterviews;
