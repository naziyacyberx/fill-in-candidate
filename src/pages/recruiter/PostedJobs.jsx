import React, { useEffect, useState } from "react";
import { Card, Image, Button, Spinner } from "react-bootstrap";
import { FaStar, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import axios from "axios";
import PaginationComponent from "../../components/recruiter/PaginationComponent";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/BaseUrl";

const filters = ["All", "Weekdays", "Weekends", "Morning", "Afternoon", "Evening", "Flexible"];
const itemsPerPage = 6;

const PostedJobs = () => {
    const navigate= useNavigate()
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}recruiter/job-list`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGxpbi1hZG1pbi5jeWJlcnhpbmZvc29sdXRpb24uY29tL2FwaS9yZWNydWl0ZXIvbG9naW4iLCJpYXQiOjE3NTIyMjc0MjcsImV4cCI6MTc1NDgxOTQyNywibmJmIjoxNzUyMjI3NDI3LCJqdGkiOiJZMjY5b3pxSXY1RjdtcTRwIiwic3ViIjoiNjMiLCJwcnYiOiIxOWU0M2I5N2YyMDI5ZTUzMDcyMzIwYzRjNzdjOTBkMTViMmMzM2ZkIn0.43eywrXj1GX9zhAhOLU1zQtytCnhuDM5Z9zg7EMHous`,
            Authorization: `Bearer ${localStorage.getItem("recruiterToken")}`,
          },
        }
      );

      if (response.data.statusCode === 200) {
        setJobs(response.data.data);
      } else {
        console.warn("No jobs found");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs
  const filteredJobs = selectedFilter === "All"
    ? jobs
    : jobs.filter((job) =>
        selectedFilter === "Flexible"
          ? true
          : job.shift && job.shift.includes(selectedFilter.toLowerCase())
      );

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  // Reset page to 1 if filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

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

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className="row">
            {currentJobs.length === 0 ? (
              <p className="text-muted">No jobs found.</p>
            ) : (
              currentJobs.map((job) => (
                <div className="col-md-6 mb-3" key={job.id}  onClick={()=>navigate(`/recruiter/job-details/${job.id}`)}>
                  <Card className="p-3 shadow-sm">
                    <div className="d-flex">
                      <Image
                        src={job.clinic_logo || "https://via.placeholder.com/120x80"}
                        width={120}
                        height={80}
                        className="me-3 rounded"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{job.title}</h6>
                        <div className="text-muted small">{job.clinic}</div>
                        <div className="d-flex flex-wrap gap-2 my-1 text-muted small">
                          <div><FaBriefcase className="me-1" />{job.experiance_level}</div>
                          <div><FaMapMarkerAlt className="me-1" />{job.address || "N/A"}</div>
                        </div>
                      <div className="text-warning d-flex align-items-center gap-1 small"
     role="button"
     onClick={() => navigate(`/recruiter/job-applicants/${job.id}`)}>
  <FaStar /> {job.candidates_count} Candidates
</div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <strong className="text-primary">
                        ₹{job.salary_range_from} - ₹{job.salary_range_to}
                      </strong>
                      {selectedFilter === "Flexible" || job.shift?.includes("flexible") ? (
                        <span className="text-primary small" role="button">
                          Flexible Shift
                        </span>
                      ) : null}
                    </div>
                  </Card>
                </div>
              ))
            )}
          </div>

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PostedJobs;
