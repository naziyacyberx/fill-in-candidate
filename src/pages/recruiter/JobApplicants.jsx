import React, { useEffect, useState } from "react";
import { Card, Image, Badge, Button, Spinner } from "react-bootstrap";
import { FaBriefcase, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const getStatusVariant = (status) => {
  switch (status.toLowerCase()) {
    case "shortlisted":
      return "success";
    case "interviewed":
      return "info";
    case "rejected":
      return "danger";
    default:
      return "secondary";
  }
};

const JobApplicants = () => {
    const navigate = useNavigate()
  const { id } = useParams(); // job ID from route
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(
        `https://fillin-admin.cyberxinfosolution.com/api/recruiter/job-candidates/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGwtaW4uY3liZXJ4aW5mb3NvbHV0aW9uLmNvbS9hcGkvcmVjcnVpdGVyL2xvZ2luIiwiaWF0IjoxNzUwNjk2MTExLCJleHAiOjE3NTMyODgxMTEsIm5iZiI6MTc1MDY5NjExMSwianRpIjoiRlRySzk0WFAzSlRmRXpFbSIsInN1YiI6IjQzIiwicHJ2IjoiMTllNDNiOTdmMjAyOWU1MzA3MjMyMGM0Yzc3YzkwZDE1YjJjMzNmZCJ9.KXOd-uvQHkroBZEYYW2OQfIvKDRMIQ2N-ws-9kX4YWQ",
          },
        }
      );

      if (res.data.statusCode === 200) {
        setApplicants(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching applicants", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  return (
    <div className="container py-4">
      <h5><strong>Job Applicants</strong></h5>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : applicants.length === 0 ? (
        <p className="text-muted">No applicants found.</p>
      ) : (
        <div className="row">
          {applicants.map((applicant) => (
            <div className="col-md-6 mb-3" key={applicant.id}>
              <Card className="p-3 shadow-sm">
                <div className="d-flex">
                  <Image
                    src={applicant?.profile}
                    roundedCircle
                    width={80}
                    height={80}
                    className="me-3"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{applicant.name}</h6>
                    <div className="text-muted small mb-1">
                      <FaBriefcase className="me-1" />
                      {applicant.year_of_experiance}
                    </div>
                    <div className="text-muted small mb-1">
                      <FaMapMarkerAlt className="me-1" />
                      {applicant.location || "Not Provided"}
                    </div>
                    <div className="text-muted small mb-1">
                      <FaStar className="me-1 text-warning" />
                      {applicant.rating} ({applicant.review_count} reviews)
                    </div>
                    <Badge bg={getStatusVariant(applicant.applied_track[0] || "applied")}>
                      {applicant.applied_track[0] || "Applied"}
                    </Badge>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button size="sm" variant="outline-primary" onClick={()=>{navigate(`/recruiter/candidate-detail/${applicant.id}`,{state:{id:applicant.id}})}}>View Profile</Button>
                  <Button size="sm" variant="outline-success"  onClick={()=>{navigate(`/recruiter/schedule-interview/${applicant.id}`, {state:{user: {name:applicant.name,title:applicant.title,id:applicant.id}}})}}>Schedule Interview</Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplicants;
