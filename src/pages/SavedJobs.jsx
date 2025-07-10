import { useEffect, useState, useMemo } from "react";
import "../styles/savedjobs.css";
import Navbar from "../sections/common/Navbar";
import Footer from "../sections/common/Footer";
import { ImSearch } from "react-icons/im";
import { bookmarkedListApi } from "../apis/BookmarkedListApi";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { TbWallet, TbUsers } from "react-icons/tb";
import { removeBookmarkedApi } from "../apis/RemoveBookmarkedApi";
import { ErrorToaster, SuccessToaster } from "../utils/Toaster";

const SavedJobs = () => {
  const [jobData, setJobData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filters = ["All", "Latest", "Oldest", "High Pay"];

  useEffect(() => {
    const fetchBookmarkedList = async () => {
      try {
        const response = await bookmarkedListApi();
        setJobData(response?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch bookmarked jobs:", error);
        setJobData([]);
      }
    };
    fetchBookmarkedList();
  }, []);

  const handleDeleteJob = async (id) => {
    try {
      const response = await removeBookmarkedApi(id);
      if (response?.data?.status) {
        SuccessToaster(response?.data?.message || "Job removed successfully");
        setJobData((prev) => prev.filter((job) => job.id !== id));
      } else {
        ErrorToaster(response?.data?.message || "Failed to remove job");
      }
    } catch {
      ErrorToaster("Something went wrong!");
    }
  };

  const filteredJobs = useMemo(() => {
    let filtered = [...jobData];

    // Search filtering
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(lowerSearch) ||
          job.address?.toLowerCase().includes(lowerSearch) ||
          job.clinic?.toLowerCase().includes(lowerSearch) ||
          job.city?.toLowerCase().includes(lowerSearch)
      );
    }

    // Sorting
    if (activeFilter === "Latest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (activeFilter === "Oldest") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (activeFilter === "High Pay") {
      filtered.sort(
        (a, b) => Number(b.salary_range_from) - Number(a.salary_range_from)
      );
    }

    return filtered;
  }, [jobData, activeFilter, searchTerm]);

  return (
    <>
      {/* <Navbar /> */}
      <section className="save-job-section">
        <div className="container">
          <h2 className="review-main-heading">Saved Jobs</h2>
          <div className="search-input-container">
            <ImSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Try to find here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="container">
          <div className="btn-group job-saved-filter">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`btn-tab button-saved-filter ${
                  activeFilter === filter ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {filteredJobs.length ? (
              filteredJobs.map((job) => (
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
                          <div className="saved-heading">{job.title}</div>
                          <div className="saved-icon-box">
                            <img
                              onClick={() => handleDeleteJob(job.id)}
                              src="/images/remove.png"
                              alt="Remove Bookmark"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>
                        <div className="text-primary clinic-name">{job.clinic}</div>
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
                          {job.salary_range_from || "N/A"} - {job.salary_range_to || "N/A"} / hour
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
            ) : (
              <p className="text-center text-muted">No saved jobs found.</p>
            )}
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default SavedJobs;
