import { useEffect, useState } from "react";
import "../../styles/job.css";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { TbWallet } from "react-icons/tb";
import { TbUsers } from "react-icons/tb";
import { saveJobApi } from "../../apis/BookmarkedApi";
import { SuccessToaster, ErrorToaster } from "../../utils/Toaster";
import { removeBookmarkedApi } from "../../apis/RemoveBookmarkedApi";

const Job = ({ jobData, refreshJobs }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [savedJobs, setSavedJobs] = useState([]);

  const handleTabClick = (type) => {
    setActiveTab(type);
  };
useEffect(() => {
  const savedJobIds = jobData
    .filter((job) => Number(job.is_saved) === 1)
    .map((job) => Number(job.id));
  setSavedJobs(savedJobIds);
}, [jobData]);


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
  const handleToggleSaveJob = async (jobId) => {
    if (savedJobs.includes(Number(jobId))) {
      // Optimistically remove job from saved list
      setSavedJobs((prev) => prev.filter((id) => id !== jobId));

      try {
        const response = await removeBookmarkedApi(jobId);
        if (!response?.data?.status) {
          // Agar API failed ho jaye to undo UI update and show error
          setSavedJobs((prev) => [...prev, jobId]);
          ErrorToaster(response?.data?.message || "Failed to remove job");
        } else {
          SuccessToaster(response?.data?.message || "Job removed successfully");
      
        }
      } catch (error) {
        // Undo UI update on error
        setSavedJobs((prev) => [...prev, jobId]);
        ErrorToaster("Something went wrong!");
      }
    } else {  
      // Optimistically add job to saved list
      setSavedJobs((prev) => [...prev, jobId]);

      try {
        const response = await saveJobApi(jobId);
        if (!response?.data?.status) {
          // Undo UI update if API fails
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

          {/* Tabs */}
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

        {/* Jobs List */}
        <div className="row g-4">
          {jobData.filter((job) => {
            if (activeTab === "All") return true;
            return job.shift?.some(
              (shiftType) => shiftType.toLowerCase() === activeTab.toLowerCase()
            );
          }).length === 0 ? (
            <div className="text-center w-100">
              <p
                className="text-muted"
                style={{ fontSize: "18px", fontWeight: "500" }}
              >
                No jobs found
              </p>
            </div>
          ) : (
            jobData
              .filter((job) => {
                if (activeTab === "All") return true;
                return job.shift?.some(
                  (shiftType) =>
                    shiftType.toLowerCase() === activeTab.toLowerCase()
                );
              })
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
                          {job.salary_range_from || "Location N/A"} -{" "}
                          {job.salary_range_to || "Location N/A"} / hour
                        </span>

                        <span className="time-span">
                          <MdOutlineAccessTime />
                          {job.time || "Experience not specified"}
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
      </div>
    </section>
  );
};

export default Job;
