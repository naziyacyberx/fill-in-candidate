import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [popularTerms, setPopularTerms] = useState([]);
  const token = localStorage.getItem("fillInToken")

  // 🔽 Fetch popular search terms
  useEffect(() => {
    const fetchPopularSearches = async () => {
      try {
        const response = await axios.get(
          "https://fillin-admin.cyberxinfosolution.com/api/candidate/search-terms",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`
            },
          }
        );

        if (response?.data?.statusCode === 200) {
          setPopularTerms(response.data.data.popular || []);
        }
      } catch (error) {
        console.error("Failed to fetch popular terms:", error);
      }
    };

    fetchPopularSearches();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `https://fill-in.cyberxinfosolution.com/api/dashboard?search=${search}`,
        {
          experiance_level: experience ? [experience] : [],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response?.data?.status === "success") {
        setJobs(response.data.data); // Optional usage
        navigate("/jobs", { state: { jobs: response.data.data.jobs } });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        <h1>
          Get The Right Job
          <br />
          You Deserve
        </h1>
        <p className="mt-3">1,30,420 jobs listed here! Your dream job is waiting.</p>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-group search-border">
            <div className="icon-box">
              <img src="/images/skill 1.png" alt="Skill Icon" className="img-fluid" />
            </div>
            <input
              type="text"
              placeholder="Enter Skills"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="search-group search-border">
            <div className="icon-box">
              <img
                className="img-fluid"
                src="/images/best-customer-experience 1.png"
                alt="Experience Icon"
              />
            </div>
            <select value={experience} onChange={(e) => setExperience(e.target.value)}>
              <option value="">Select Experience</option>
              <option value="fresher">Fresher</option>
              <option value="1-2 Years">1-2 Years</option>
              <option value="3+ Years">3+ Years</option>
              <option value="4 Years">4 Years</option>
            </select>
          </div>

          <div className="search-group">
            <div className="icon-box">
              <img className="img-fluid" src="/images/placeholder 1.png" alt="Location" />
            </div>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleSearch}>
            Search Jobs
          </button>
        </div>

        {/* Popular Tags */}
        <div className="popular-tags">
          <strong>Popular Searches:</strong>
          {popularTerms.length > 0 ? (
            popularTerms.map((term, index) => (
              <span key={index} onClick={() => setSearch(term.term)}>
                {term.term}
              </span>
            ))
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
