import React, { useState, useEffect } from "react";
import { Form, Button, Badge, Spinner } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt, FaHistory, FaTimes } from "react-icons/fa";
import axios from "axios";
import "../../styles/recruiter/searchprofile.css";

// const popularSearches = [
//   "Teeth Cleaning",
//   "Dental Implants",
//   "Dental Specialist",
//   "Senior Dentist",
// ];

const SearchProfiles = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSearches = async () => {
    try {
      const response = await axios.get(
        "https://fillin-admin.cyberxinfosolution.com/api/recruiter/search-terms",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGwtaW4uY3liZXJ4aW5mb3NvbHV0aW9uLmNvbS9hcGkvcmVjcnVpdGVyL2xvZ2luIiwiaWF0IjoxNzUwNjk2MTExLCJleHAiOjE3NTMyODgxMTEsIm5iZiI6MTc1MDY5NjExMSwianRpIjoiRlRySzk0WFAzSlRmRXpFbSIsInN1YiI6IjQzIiwicHJ2IjoiMTllNDNiOTdmMjAyOWU1MzA3MjMyMGM0Yzc3YzkwZDE1YjJjMzNmZCJ9.KXOd-uvQHkroBZEYYW2OQfIvKDRMIQ2N-ws-9kX4YWQ`,
          },
        }
      );

      const popular = response.data?.data?.popular || [];
      const recent = response.data?.data?.recent || [];
      console.log("popular",  response?.data);
      console.log("recent", recent);
      
      setPopularSearches(popular)
      setRecentSearches(recent);
    } catch (error) {
      console.error("Failed to fetch search terms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearches();
  }, []);

  const removeSearch = (index) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="search-profiles-container">
      <h5><strong>Search Profiles</strong></h5>

      <div className="custom-input-wrapper">
        <FaSearch className="input-icon" />
        <input
          type="text"
          placeholder="Job title, Profession, Software"
          className="custom-input"
        />
      </div>

      <div className="custom-input-wrapper mt-3">
        <FaMapMarkerAlt className="input-icon" />
        <input
          type="text"
          placeholder="Enter Location"
          className="custom-input"
        />
      </div>

      <Button variant="primary" className="w-100 mt-4 mb-4">
        Search Jobs
      </Button>

      <h6><strong>Popular Searches</strong></h6>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {popularSearches?.map((item, idx) => (
          <Badge key={idx} bg="light" text="dark" className="px-3 py-2 rounded-pill">
            {item.term}
          </Badge>
        ))}
      </div>

      <h6><strong>Recent Searches</strong></h6>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" size="sm" />
        </div>
      ) : recentSearches.length === 0 ? (
        <div className="text-muted">No recent searches found.</div>
      ) : (
        <div>
          {recentSearches?.map((search, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <div className="d-flex align-items-center">
                <FaHistory className="me-2 text-muted" />
                {search.term}
              </div>
              <FaTimes
                role="button"
                className="text-muted"
                onClick={() => removeSearch(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProfiles;
