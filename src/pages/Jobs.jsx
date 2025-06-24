import React,{useState, useEffect} from 'react'
import Card from '../sections/home/Card'
import { useLocation, useNavigate } from 'react-router-dom'
import Job from '../sections/home/Job'

import "../styles/job.css";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { TbWallet } from "react-icons/tb";
import { TbUsers } from "react-icons/tb";
import { saveJobApi } from "../apis/BookmarkedApi";
import { SuccessToaster, ErrorToaster } from "../utils/Toaster";
import { removeBookmarkedApi } from "../apis/RemoveBookmarkedApi";
import FilterDrawer from '../components/FilterDrawer';
import axios from 'axios';
import Navbar from '../sections/common/Navbar';
import Footer from '../sections/common/Footer';


const Jobs = () => {
  const navigate = useNavigate();
  const mylocation = useLocation();
  const locationJobs = mylocation?.state?.jobs || null; // Safe access
  const [jobData, setJobData] = useState(locationJobs); // Initially from location if present

  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // If jobData is not available from location, fetch from API
    if (!locationJobs) {
      fetchInitialJobs();
    } else {
      setFilteredJobs(locationJobs); // Pre-populate if available
    }
  }, []);

  const fetchInitialJobs = async () => {
    try {
      const response = await axios.get("https://fill-in.cyberxinfosolution.com/api/dashboard");
      const jobsFromAPI = response?.data?.data?.jobs || [];
      setJobData(jobsFromAPI);
      console.log("test", jobsFromAPI);
      
      setFilteredJobs(jobsFromAPI);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  
    const handleTabClick = (type) => {
      setActiveTab(type);
    };
  useEffect(() => {
    const savedJobIds = jobData
      ?.filter((job) => Number(job.is_saved) === 1)
      ?.map((job) => Number(job.id));
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
      if (savedJobs?.includes(Number(jobId))) {
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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const [experience, setExperience] = useState("");
// Inside Jobs component
const [location, setLocation] = useState("");

const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
const [selectedFilters, setSelectedFilters] = useState({});

// const handleApplyFilters = () => {
//   toggleDrawer();
//   // Add additional filter logic or API calls if needed
// };

const [selectedSoftware, setSelectedSoftware] = useState([]);
const [selectedProfessions, setSelectedProfessions] = useState([]);
const [selectedShifts, setSelectedShifts] = useState([]);
const [selectedExperienceLevels, setSelectedExperienceLevels] = useState([]);
const softwareMap = {
  "Dental4Windows": 1,
  "Oasis": 5,
  "Exact": 3,
};

const professionMap = {
  "Dentist": 1,
  "Dental Assistant": 5,
  "Receptionist": 3,
  "Hygienist": 4,
  "Oral Health Therapist": 2,
};

const handleApplyFilters = async () => {
  const payload = {
    software: selectedSoftware.map(name => softwareMap[name]),
    profession: selectedProfessions.map(name => professionMap[name]),
    shift: selectedShifts,
    experiance_level: selectedExperienceLevels,
  };

  try {
    const response = await axios.post(
      "https://fill-in.cyberxinfosolution.com/api/dashboard",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // ✅ Update job list with new results
    setFilteredJobs(response.data.data.jobs || []);
    
    setCurrentPage(1); // Reset to first page
  } catch (error) {
    console.error("Error applying filters:", error);
  }

  toggleDrawer(); // close drawer
};

const [filteredJobs, setFilteredJobs] = useState(jobData); // initial state is full list


const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage = 8;

const totalPages = Math.ceil(filteredJobs?.length / jobsPerPage);


const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
  }
};

useEffect(() => {
  if (!filteredJobs || filteredJobs?.length === 0) return;
  const savedJobIds = filteredJobs
    .filter((job) => Number(job.is_saved) === 1)
    .map((job) => Number(job.id));
  setSavedJobs(savedJobIds);
}, [filteredJobs]);

  return (
    <>
    <Navbar/>
<section className="job-section container py-5">
  <div className="row">
    {/* Left Filter Column */}
    <div className="col-md-4 col-lg-3">
      <FilterDrawer
        isOpen={true}
        onClose={() => {}}
        selectedSoftware={selectedSoftware}
        setSelectedSoftware={setSelectedSoftware}
        selectedProfessions={selectedProfessions}
        setSelectedProfessions={setSelectedProfessions}
        selectedShifts={selectedShifts}
        setSelectedShifts={setSelectedShifts}
        selectedExperienceLevels={selectedExperienceLevels}
        setSelectedExperienceLevels={setSelectedExperienceLevels}
        onApply={handleApplyFilters}
      />
    </div>

    {/* Right Jobs Column */}
    <div className="col-md-8 col-lg-9">
     
      <p className="mb-4">
        Showing <strong>{filteredJobs?.length}</strong>  job result
      </p>
      

      {filteredJobs?.length === 0 ? (
        <div className="text-center w-100">
          <p className="text-muted" style={{ fontSize: "18px", fontWeight: "500" }}>
            No jobs found
          </p>
        </div>
      ) : (
        // jobData.map((job) => (
  <div className="row">
    {filteredJobs
      ?.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
      ?.map((job) => (
 <div className="col-md-12  col-lg-6 mb-3 cursor-pointer" key={job.id}
 >
  <div className="border rounded shadow-sm p-3 h-100 position-relative">
    {/* Bookmark Icon - Top Right */}
    <div
      onClick={() => handleToggleSaveJob(job.id)}
      style={{ position: "absolute", top: "12px", right: "12px", cursor: "pointer" }}
    >
      <img
        src={
          savedJobs?.includes(Number(job.id))
            ? "/images/remove.png"
            : "/images/bookmark.png"
        }
        alt="bookmark"
        style={{ width: "18px", height: "18px" }}
      />
    </div>
    <div 
    
 onClick={()=>navigate(`/job-details/${job.id}`)}
    >


    {/* Top Row */}
    <div className="d-flex" >
      <img
        src={job.clinic_logo || "/images/dummy-img.png"}
        alt="logo"
        className="rounded"
        style={{ width: "60px", height: "60px", objectFit: "cover" }}
      />
      <div className="ms-3">
        <h6 className="fw-semibold mb-1">{job.title}</h6>
        <div>
          <a href="#" className="text-primary small">
            {job.clinic}
          </a>
        </div>
      </div>
    </div>

    {/* Meta Info Row */}
    <div className="d-flex flex-wrap gap-2 mt-3 text-muted small">
      <div className="d-flex align-items-center me-3">
        <FiMapPin className="me-1" />
        {job.address || "Location N/A"}
      </div>
      <div className="d-flex align-items-center me-3">
        <MdOutlineAccessTime className="me-1" />
        {job.time || "Time N/A"}
      </div>
      <div className="d-flex align-items-center me-3">
        <SlCalender className="me-1" />
        {job.experiance_level || "Experience N/A"}
      </div>
      <div className="d-flex align-items-center me-3">
        <TbWallet className="me-1" />
        {job.salary_range_from || 0} - {job.salary_range_to || 0}/hour
      </div>
    </div>
    </div>

  </div>
</div>

  ))}
</div>



        // )
    // )
      )
      }
    </div>
  </div>
  <div className="d-flex justify-content-center mt-4">
  <nav>
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
          &larr;
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, i) => (
        <li
          key={i + 1}
          className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
          &rarr;
        </button>
      </li>
    </ul>
  </nav>
</div>

</section>

<Footer/>




    </>

  )
}

export default Jobs