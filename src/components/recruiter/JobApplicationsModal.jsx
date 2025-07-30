import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, ListGroup } from "react-bootstrap";
import axios from "axios";
import "../../styles/recruiter/jobapplicationmodal.css"

const JobApplicationsModal = ({ candidateId, show, onHide, onSelectJob }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!candidateId || !show) return;

    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `https://fillin-admin.cyberxinfosolution.com/api/recruiter/job-candidates/${candidateId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("recruiterToken")}`,
            },
          }
        );
        setJobs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [candidateId, show]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Jobs Applied By Candidate</Modal.Title>
      </Modal.Header>
    <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" ,marginBottom:"20px"}}>
  {loading ? (
    <div className="text-center">
      <Spinner animation="border" />
    </div>
  ) : jobs.length === 0 ? (
    <p>No jobs found.</p>
  ) : (
    <div className="job-list">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="job-card p-3 mb-3 border rounded shadow-sm"
          onClick={() => {
            onSelectJob(job);
            onHide();
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="mb-1">{job.name}</h5>
              <p className="text-muted mb-1">{job.company || "Dental Clinic"}</p>
              <p className="text-muted small mb-1">
                {job.city}, {job.state}
              </p>
              <p className="text-muted small mb-0">
                {job.experience_level || job.year_of_experiance}
              </p>
            </div>
            <div className="text-end">
              {/* <span className="badge bg-success mb-2">Flexible on Pay</span> */}
              <br />
              <span className="text-warning">
                ★ {job.rating || "4.8"} ({job.review_count || 3} reviews)
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</Modal.Body>

    </Modal>
  );
};

export default JobApplicationsModal;
