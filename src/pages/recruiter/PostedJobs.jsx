import React, { useState } from "react";
import { Card, Badge, Image, Button } from "react-bootstrap";
import { FaStar, FaMapMarkerAlt, FaClock, FaBriefcase } from "react-icons/fa";

const filters = ["All", "Weekdays", "Weekends", "Morning", "Afternoon", "Evening", "Flexible"];

const dummyJobs = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  title: "Senior Dental Hygienist",
  hospital: "Dental Care Hospital",
  experience: "6 Years",
  location: "San Francisco, CA",
  rating: 3.6,
  reviews: 84,
  image: "https://via.placeholder.com/120x80",
  price: "$1000/hour",
  flexible: true,
}));

const PostedJobs = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <div className="container py-4">
      <h5><strong>Posted Jobs</strong></h5>

      {/* Filter Buttons */}
      <div className="d-flex flex-wrap gap-2 my-3">
        {filters.map((filter, idx) => (
          <Button
            key={idx}
            variant={selectedFilter === filter ? "primary" : "outline-primary"}
            size="sm"
            className="rounded-pill px-3"
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="row">
        {dummyJobs.map((job) => (
          <div className="col-md-6 mb-3" key={job.id}>
            <Card className="p-3 shadow-sm">
              <div className="d-flex">
                <Image src={job.image} width={120} height={80} className="me-3 rounded" />
                <div className="flex-grow-1">
                  <h6 className="mb-1">{job.title}</h6>
                  <div className="text-muted small">{job.hospital}</div>
                  <div className="d-flex flex-wrap gap-2 my-1 text-muted small">
                    <div><FaBriefcase className="me-1" />{job.experience}</div>
                    <div><FaMapMarkerAlt className="me-1" />{job.location}</div>
                  </div>
                  <div className="text-warning d-flex align-items-center gap-1 small">
                    <FaStar /> {job.rating} ({job.reviews} Reviews)
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <strong className="text-primary">{job.price}</strong>
                {job.flexible && (
                  <span className="text-primary small" role="button">
                    Flexible on Pay
                  </span>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostedJobs;
