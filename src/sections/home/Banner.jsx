import React, { useState, useEffect } from "react";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";
import "../../styles/banner.css";

const Banner = () => {
  const google_api_key = import.meta.env.VITE_GOOGLE_API_KEY;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [jobs, setJobs] = useState([]);
  const [popularTerms, setPopularTerms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("fillInToken");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const portal = sessionStorage.getItem("selectedPortal");
    if (portal !== "candidate") {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const fetchPopularSearches = async () => {
      try {
        const response = await axios.get(
          "https://fillin-admin.cyberxinfosolution.com/api/candidate/search-terms",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
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

  // ✅ Fix: Correct API key param in details API
  // useEffect(() => {
  //   if (location?.value?.place_id) {
  //     const fetchLatLng = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://maps.googleapis.com/maps/api/place/details/json?placeid=${location.value.place_id}&key=${google_api_key}`
  //         );
  //         const locationData = response.data?.result?.geometry?.location;
  //         if (locationData) {
  //           setCoordinates({ lat: locationData.lat, lng: locationData.lng });
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch coordinates:", error);
  //       }
  //     };
  //     fetchLatLng();
  //   }
  // }, [location]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://fillin-admin.cyberxinfosolution.com/api/dashboard`,
        {
          params: {
            search: search,
            // experiance_level: experience,
            latitude: lat,
            longitude: lng,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response?.data?.status === "success") {
        navigate("/candidate/jobs", { state: { jobs: response.data.data.jobs } });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
    const handleSelect = (val) => {
    setLocation(val);
    setIsFocused(false);

    const placeId = val.value.place_id;

    if (!placeId || !window.google) return;

    const service = new window.google.maps.places.PlacesService(document.createElement("div"));

    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        setLat(latitude.toString());
        setLng(longitude.toString());

      } else {
        console.error("Place details fetch failed:", status);
      }
    });
  };

  return (
    <section className="hero-section">
      <div className="container">
        {showModal && (


<div className="custom-popup-overlay">
  <div className="custom-popup-box d-flex">
    {/* Left: Text + Logo + Buttons */}
      <div className="popup-right">
      <img src="/images/popup-image.png" alt="Dental Illustration" className="popup-illustration" />
    </div>

    {/* Right: Illustration */}

    <div className="popup-left d-flex flex-column justify-content-center align-items-start p-4">
      <img src="/images/logo.png" alt="Fill-In Logo" className="popup-logo mb-3" />

      <h4 className="fw-bold mb-2">
        Looking for Your Next Dental <span className="text-primary">Opportunity?</span>
      </h4>
      <p className="mb-4 text-muted" style={{ maxWidth: "350px" }}>
        Join top dental clinics hiring now. Find the best-fit job that values your skills and passion.
      </p>

      <div className="d-flex gap-3">
        {/* <button className="btn btn-primary px-4" onClick={() => setShowModal(false)}>
          Stay on candidate
        </button>
        <button className="btn btn-outline-primary px-4" onClick={() => {navigate("/recruiter"); setShowModal(false)}}>
          Go to Recruiter
        </button> */}
        <button
  className="btn btn-primary px-4"
  onClick={() => {
    sessionStorage.setItem("selectedPortal", "candidate"); // 🔹 Save to session
    setShowModal(false);
  }}
>
  Stay on Candidate
</button>

<button
  className="btn btn-outline-primary px-4"
  onClick={() => {
    sessionStorage.setItem("selectedPortal", "recruiter"); // 🔹 Save to session
    navigate("/recruiter");
    setShowModal(false);
  }}
>
  Go to Recruiter
</button>

      </div>
    </div>

  
  </div>
</div>


        )}

        <h1>
          Get The Right Job
          <br />
          You Deserve
        </h1>
        <p className="mt-3">1,30,420 jobs listed here! Your dream job is waiting.</p>

        {/* 🔽 Search Bar */}
        <div className="search-bar flex-wrap d-flex gap-3 align-items-center justify-content-start">

          {/* Skills */}
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

          {/* Experience */}
          <div className="search-group search-border">
            <div className="icon-box">
              <img className="img-fluid" src="/images/best-customer-experience 1.png" alt="Experience Icon" />
            </div>
            <select value={experience} onChange={(e) => setExperience(e.target.value)}>
              <option value="">Select Experience</option>
              <option value="fresher">Fresher</option>
              <option value="1-2 Years">1-2 Years</option>
              <option value="3+ Years">3+ Years</option>
              <option value="4 Years">4 Years</option>
            </select>
          </div>

          {/* 🔽 Location */}
          <div
            className="d-flex align-items-center gap-2 flex-grow-1"
            style={{ minWidth: "250px", maxWidth: "400px" }}
          >
            <div className="icon-box">
              <img
                className="img-fluid"
                src="/images/placeholder 1.png"
                alt="Location"
                style={{ width: "24px", height: "24px" }}
              />
            </div>
            <div style={{ minWidth: 300, width: "100%" }}>
      <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY} // Or process.env.REACT_APP_GOOGLE_API_KEY if using CRA
        selectProps={{
          value: location,
          onChange: handleSelect,
          onFocus: () => setIsFocused(true),
          placeholder: "Enter Location",
          styles: {
            control: (base) => ({
              ...base,
              // border: "1px solid #ccc",
              borderRadius: "6px",
              minHeight: "45px",
              boxShadow: "none",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#888",
            }),
          },
        }}
           autocompletionRequest={{
          types: ["(cities)"], // 👈 Restrict to cities
       
        }}
      />

    
    </div>
            {/* <div style={{ flex: 1 }}>
              {google_api_key && (
                <GooglePlacesAutocomplete
                
                  apiKey={google_api_key}
                  selectProps={{
                  
                    value: location,
                    onChange: setLocation,
                    placeholder: "Location",
                    styles: {
                      container: (provided) => ({
                        ...provided,
                        width: "100%",
                      }),
                      control: (provided) => ({
                        ...provided,
                        minHeight: "45px",
                        borderRadius: "5px",
                        borderColor: "#ced4da",
                        boxShadow: "none",
                      }),
                    },
                  }}
                />
              )}
            </div> */}
          </div>

          {/* Search Button */}
          <button className="btn btn-primary mt-2 mt-md-0" onClick={handleSearch}>
            Search Jobs
          </button>
        </div>

        {/* 🔽 Popular Tags */}
        <div className="popular-tags mt-3">
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
