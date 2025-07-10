import  { useState } from "react";
import "../styles/filter.css";
import Navbar from "../sections/common/Navbar";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { MdFilterList } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { LuBadgeCheck } from "react-icons/lu";

const Filter = () => {
  const [expanded, setExpanded] = useState({
    jobType: true,
    datePosted: true,
    experience: true,
    keySkills: true,
    workShift: true,
    degree: true,
    noticePeriod: true,
    sortBy: true,
  });


  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showMoreSkills, setShowMoreSkills] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState(null);

  const noticeOptions = ["Immediate", "15 Days", "30 Days", "3 Months"];

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const visibleSkills = [
    "Dental Surgery",
    "Orthodontics",
    "Dental",
    "Periodontics",
    "Patient Care",
  ];
  const extraSkills = ["Dental Care", "Dental Hygiene", "Full Skills"];
  return (
    <>
      {/* <Navbar /> */}
      <section className="filter-section">
        <div className="container">
          <div className="top-heading-main">
            <h2>Recommended jobs for you</h2>
            <h5>Jobs in Delhi-NCR</h5>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 mb-4">
              <div className="filter-sidebar-wrapper">
                <div className="filter-header">
                  <MdFilterList /> Filter
                </div>

                {/* Job Type */}
                <div className="filter-group">
                  <div
                    className="filter-title"
                    onClick={() => toggleSection("jobType")}
                  >
                    Job Type{" "}
                    <span className="arrow">
                      {expanded.jobType ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </div>
                  {expanded.jobType && (
                    <div className="filter-options">
                      {["Full Time", "Part Time", "Contract", "Temporary"].map(
                        (type, i) => (
                          <label key={i} className="filter-radio">
                            <input type="radio" name="jobType" /> {type}
                          </label>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Date Posted */}
                <div className="filter-group">
                  <div
                    className="filter-title"
                    onClick={() => toggleSection("datePosted")}
                  >
                    Date Posted{" "}
                    <span className="arrow">
                      {expanded.datePosted ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </div>
                  {expanded.datePosted && (
                    <div className="filter-options">
                      {[
                        "All",
                        "Last 24 Hours",
                        "Last 3 Days",
                        "Last 7 Days",
                      ].map((label, i) => (
                        <label key={i} className="filter-radio">
                          <input type="radio" name="datePosted" /> {label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Experience */}
                <div className="filter-group">
                  <div
                    className="filter-title"
                    onClick={() => toggleSection("experience")}
                  >
                    Experience{" "}
                    <span className="arrow">
                      {expanded.experience ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </div>
                  {expanded.experience && (
                    <div className="filter-options">
                      {[
                        "Entry Level (0–2 years)",
                        "Mid Level (3–5 years)",
                        "Senior (6+ years)",
                        "Lead/Manager",
                      ].map((exp, i) => (
                        <label key={i} className="filter-radio">
                          <input type="radio" name="experience" /> {exp}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Key Skills */}
                <div className="filter-group">
                  <div
                    className="filter-title"
                    onClick={() => toggleSection("keySkills")}
                  >
                    Key Skills{" "}
                    <span className="arrow">
                      {expanded.keySkills ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </div>
                  {expanded.keySkills && (
                    <>
                      <div className="filter-tags">
                        {visibleSkills.map((skill, i) => (
                          <span
                            key={i}
                            className={`tag ${
                              selectedSkills.includes(skill) ? "selected" : ""
                            }`}
                            onClick={() => toggleSkill(skill)}
                          >
                            {skill}
                          </span>
                        ))}
                        {showMoreSkills &&
                          extraSkills.map((skill, i) => (
                            <span
                              key={i}
                              className={`tag ${
                                selectedSkills.includes(skill) ? "selected" : ""
                              }`}
                              onClick={() => toggleSkill(skill)}
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                      <button
                        className="add-skill-btn"
                        onClick={() => setShowMoreSkills(!showMoreSkills)}
                      >
                        {showMoreSkills ? "Show Less" : "Add Skills"}
                      </button>
                    </>
                  )}
                </div>

                {/* Work Shift */}
                <div className="filter-group">
                  <div
                    className="filter-title"
                    onClick={() => toggleSection("workShift")}
                  >
                    Work Shift{" "}
                    <span className="arrow">
                      {expanded.workShift ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </div>
                  {expanded.workShift && (
                    <div className="filter-options">
                      {["Full Time", "Part Time"].map((shift, i) => (
                        <label key={i} className="filter-radio">
                          <input type="radio" name="workShift" /> {shift}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Degree */}
                <div className="filter-group">
                  <div
                    className="filter-title"
                    onClick={() => toggleSection("degree")}
                  >
                    Degree{" "}
                    <span className="arrow">
                      {expanded.degree ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </div>
                  {expanded.degree && (
                    <input
                      type="text"
                      className="form-control mt-2 degree-form"
                      placeholder="BDS"
                    />
                  )}
                </div>

                {/* Notice Period */}
                <div className="filter-group">
                  <div className="filter-title">Notice Period</div>
                  <div className="filter-tags">
                    {noticeOptions.map((np, i) => (
                      <span
                        key={i}
                        className={`tag ${
                          selectedNotice === np ? "selected" : ""
                        }`}
                        onClick={() => setSelectedNotice(np)}
                      >
                        {np}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div className="filter-group">
                  <div
                    className="filter-title"
                    onClick={() => toggleSection("sortBy")}
                  >
                    Sort By{" "}
                    <span className="arrow">
                      {expanded.sortBy ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </div>
                  {expanded.sortBy && (
                    <div className="filter-options">
                      {[
                        "Relevant",
                        "Salary - High to low",
                        "Date posted - New to Old",
                      ].map((sort, i) => (
                        <label key={i} className="filter-radio">
                          <input type="radio" name="sortBy" /> {sort}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 mb-4">
              <div className="filter-right-main">
                <div className="filter-right-top">
                  <div className="filter-top-img">
                    <img className="img-fluid" src="images/lab.jpg" alt="img" />
                  </div>
                  <div className="filter-top-details">
                    <h3>Senior Dental Hygienist</h3>
                    <h6>Dental Care Hospital</h6>
                    <span>
                      <FaMoneyBills /> $14,000 - 25,000 monthly{" "}
                    </span>
                  </div>
                </div>

                <div className="filter-right-top filter-right-bottom">
                  <div className="filter-top-img"></div>
                  <div className="filter-bottom-main-details">
                    <div className="filter-top-details ">
                      <span>
                        <FaMapMarkerAlt /> San Francisco, CA{" "}
                      </span>

                      <span>
                        <MdOutlineWatchLater /> 2 hours ago{" "}
                      </span>
                    </div>

                    <div className="filter-top-details">
                      <span>
                        <IoBagOutline /> Full Time{" "}
                      </span>
                      <span>
                        <LuBadgeCheck /> 3+Years{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-right-main">
                <div className="filter-right-top">
                  <div className="filter-top-img">
                    <img className="img-fluid" src="images/lab.jpg" alt="img" />
                  </div>
                  <div className="filter-top-details">
                    <h3>Senior Dental Hygienist</h3>
                    <h6>Dental Care Hospital</h6>
                    <span>
                      <FaMoneyBills /> $14,000 - 25,000 monthly{" "}
                    </span>
                  </div>
                </div>

                <div className="filter-right-top filter-right-bottom">
                  <div className="filter-top-img"></div>
                  <div className="filter-bottom-main-details">
                    <div className="filter-top-details ">
                      <span>
                        <FaMapMarkerAlt /> San Francisco, CA{" "}
                      </span>

                      <span>
                        <MdOutlineWatchLater /> 2 hours ago{" "}
                      </span>
                    </div>

                    <div className="filter-top-details">
                      <span>
                        <IoBagOutline /> Full Time{" "}
                      </span>
                      <span>
                        <LuBadgeCheck /> 3+Years{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-right-main">
                <div className="filter-right-top">
                  <div className="filter-top-img">
                    <img className="img-fluid" src="images/lab.jpg" alt="img" />
                  </div>
                  <div className="filter-top-details">
                    <h3>Senior Dental Hygienist</h3>
                    <h6>Dental Care Hospital</h6>
                    <span>
                      <FaMoneyBills /> $14,000 - 25,000 monthly{" "}
                    </span>
                  </div>
                </div>

                <div className="filter-right-top filter-right-bottom">
                  <div className="filter-top-img"></div>
                  <div className="filter-bottom-main-details">
                    <div className="filter-top-details ">
                      <span>
                        <FaMapMarkerAlt /> San Francisco, CA{" "}
                      </span>

                      <span>
                        <MdOutlineWatchLater /> 2 hours ago{" "}
                      </span>
                    </div>

                    <div className="filter-top-details">
                      <span>
                        <IoBagOutline /> Full Time{" "}
                      </span>
                      <span>
                        <LuBadgeCheck /> 3+Years{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Filter;
