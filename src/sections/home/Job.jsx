import { useEffect, useState } from "react";
import "../../styles/job.css";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { TbWallet, TbUsers } from "react-icons/tb";
import { saveJobApi } from "../../apis/BookmarkedApi";
import { SuccessToaster, ErrorToaster } from "../../utils/Toaster";
import { removeBookmarkedApi } from "../../apis/RemoveBookmarkedApi";

const Job = ({ jobData, refreshJobs }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  const jobTypes = [
    "All",
    "Weekdays",
    "Night",
    "Weekends",
    "Morning",
    "Afternoon",
    "Evening",
    "Flexible",
  ];

  useEffect(() => {
    const savedJobIds = jobData
      .filter((job) => Number(job.is_saved) === 1)
      .map((job) => Number(job.id));
    setSavedJobs(savedJobIds);
  }, [jobData]);

  useEffect(() => {
    setCurrentPage(1); // Reset pagination on tab change
  }, [activeTab]);

  const filteredJobs = jobData.filter((job) => {
    if (activeTab === "All") return true;
    return job.shift?.some(
      (shiftType) => shiftType.toLowerCase() === activeTab.toLowerCase()
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleTabClick = (type) => {
    setActiveTab(type);
  };

  const handleToggleSaveJob = async (jobId) => {
    if (savedJobs.includes(Number(jobId))) {
      setSavedJobs((prev) => prev.filter((id) => id !== jobId));
      try {
        const response = await removeBookmarkedApi(jobId);
        if (!response?.data?.status) {
          setSavedJobs((prev) => [...prev, jobId]);
          ErrorToaster(response?.data?.message || "Failed to remove job");
        } else {
          SuccessToaster(response?.data?.message || "Job removed successfully");
        }
      } catch (error) {
        setSavedJobs((prev) => [...prev, jobId]);
        ErrorToaster("Something went wrong!");
      }
    } else {
      setSavedJobs((prev) => [...prev, jobId]);
      try {
        const response = await saveJobApi(jobId);
        if (!response?.data?.status) {
          setSavedJobs((prev) => prev.filter((id) => id !== jobId));
          ErrorToaster(response?.data?.message || "Failed to save job");
        } else {
          SuccessToaster(response?.data?.message || "Job saved successfully");
        }
      } catch (error) {
        console.log("Save job error:", error);
        setSavedJobs((prev) => prev.filter((id) => id !== jobId));
        ErrorToaster(error?.message || error || "Something went wrong!");
      }
    }
  };

  return (
    <section>
      <div className="container py-5">
        <div className="text-center mb-4">
          <h3>
            <p className="card-title-section mb-4">
              Jobs Of The <span style={{ color: "#1e90ff" }}>Day</span>
            </p>
          </h3>
          <p className="text-muted mb-2">
            Search and connect with the right candidates faster
          </p>

          <div className="btn-group job-type-filter">
            {jobTypes.map((type) => (
              <button
                key={type}
                className={`btn-tab button-filter ${
                  activeTab === type ? "active" : ""
                }`}
                onClick={() => handleTabClick(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center w-100">
              <p
                className="text-muted"
                style={{ fontSize: "18px", fontWeight: "500" }}
              >
                No jobs found
              </p>
            </div>
          ) : (
            filteredJobs
              .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
              .map((job) => (
                <div className="col-md-6 col-lg-4 col-sm-6" key={job.id}>
                  <div className="job-card">
                    <div className="job-card-content-box">
                      <div className="job-card-img-box">
                        <img
                          src={job.clinic_logo || "/images/dummy-img.png"}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/dummy-img.png";
                          }}
                          className="rounded img-fluid"
                          alt="Company Logo"
                        />
                      </div>

                      <div className="job-card-title-box">
                        <div className="applicant-name">
                          <div className="saved-heading">{job.title}</div>{" "}
                          <div className="saved-icon-box">
                            <img
                              onClick={() => handleToggleSaveJob(job.id)}
                              src={
                                savedJobs.includes(Number(job.id))
                                  ? "/images/remove.png"
                                  : "/images/bookmark.png"
                              }
                              alt={
                                savedJobs.includes(Number(job.id))
                                  ? "Unsave job"
                                  : "Save job"
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>
                        <div className="text-primary clinic-name">
                          {job.clinic}
                        </div>
                      </div>
                    </div>
                    <div className="job-card-feature-box">
                      <div className="job-meta">
                        <span className="map-span">
                          <FiMapPin />
                          {job.address || "Location N/A"}
                        </span>

                        <span className="calender-span">
                          <SlCalender />
                          {job.experiance_level || "Experience not specified"}
                        </span>
                      </div>

                      <div className="job-meta">
                        <span className="map-span">
                          <TbWallet />
                          {job.salary_range_from || "0"} -{" "}
                          {job.salary_range_to || "0"} / hour
                        </span>

                        <span className="time-span">
                          <MdOutlineAccessTime />
                          {job.time || "N/A"}
                        </span>
                      </div>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-between align-items-center applicants-box">
                      <small className="text-muted">
                        <TbUsers /> {job.candidates_count || 0} Applicants
                      </small>
                      <Link
                        to={`/job-details/${job.id}`}
                        className="btn btn-primary view-job-btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    &larr;
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    &rarr;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default Job;
