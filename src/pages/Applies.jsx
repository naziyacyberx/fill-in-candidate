import { useEffect, useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaRupeeSign,
  FaBookmark,
} from "react-icons/fa";
import axios from "axios";
import "../styles/applies.css";
import Navbar from "../sections/common/Navbar";
import { SuccessToaster } from "../utils/Toaster";
import Footer from "../sections/common/Footer";
import { baseUrl } from "../utils/BaseUrl";
import Pagination from "../components/common/Pagination";


const Applies = () => {
  const [filter, setFilter] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8; // Number of jobs per page

  const token = localStorage.getItem("fillInToken");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}candidate/applied-jobs`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobs(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, [token]);

  const handleBookmarkToggle = async (jobId, isSaved) => {
    const url = isSaved
      ? `${baseUrl}candidate/remove-bookmarked/${jobId}`
      : `${baseUrl}candidate/bookmarked/${jobId}`;

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SuccessToaster(response?.data?.message);

      // Optimistically update the saved state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, is_saved: !isSaved } : job
        )
      );
    } catch (err) {
      console.error("Bookmark toggle error:", err);
    }
  };

  // Filtering and sorting logic
  const filteredJobs = jobs
    .filter((job) =>
      job.title?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((job) => {
      if (filter === "saved") return job.is_saved === 1;
      return true;
    })
    .sort((a, b) => {
      if (filter === "latest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (filter === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (filter === "highpay") {
        return (b.salary_range_to || 0) - (a.salary_range_to || 0);
      }
      return 0;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <>
      {/* <Navbar /> */}
      <div className="applies-container">
        <h3>Applications</h3>

        <div className="search-bar d-flex flex-row  align-items-center">
          <div>
            <FaSearch />
          </div>
          <div>
            <input
              type="text"
              placeholder="Try to find here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-buttons">
          {["all", "latest", "oldest", "saved", "highpay"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => {
                setFilter(f);
                setCurrentPage(1); // Reset to first page when filter changes
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="job-grid">
          {currentJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-card-body">
                <img
                  src={job.clinic_logo || "/images/job-thumb.png"}
                  alt="Clinic Logo"
                  className="job-card-image"
                />
                <div className="job-card-content">
                  <div className="job-card-header">
                    <h5>{job.title}</h5>
                    <FaBookmark
                      className={`bookmark-icon ${
                        job.is_saved ? "saved" : ""
                      }`}
                      onClick={() =>
                        handleBookmarkToggle(job.id, job.is_saved)
                      }
                      style={{ cursor: "pointer" }}
                      title={job.is_saved ? "Unsave" : "Save"}
                    />
                  </div>
                  <p className="job-doctor">{job.clinic || "Clinic Name"}</p>
                </div>
              </div>
              <div className="job-card-tags">
                <div>
                  <span>
                    <FaMapMarkerAlt /> {job.address || "Location"}
                  </span>
                  <span>
                    <FaBriefcase /> {job.practice_size || "Full Time"}
                  </span>
                </div>

                <div>
                  <span>
                    <FaClock /> {job.time || "2 hours ago"}
                  </span>
                  <span>
                    <FaRupeeSign /> ₹{job.salary_range_from} - ₹
                    {job.salary_range_to}
                  </span>
                </div>
              </div>
            </div>
            
          ))}
      
        </div>

        {/* Add Pagination here */}
            <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
   
      </div>

      {/* <Footer/> */}
    </>
  );
};

export default Applies;
