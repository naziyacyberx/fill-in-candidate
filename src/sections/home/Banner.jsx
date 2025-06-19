import React from "react";
import "../../styles/banner.css";

const Banner = () => {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1>
            Get The Right Job
            <br />
            You Deserve
          </h1>
          <p className="mt-3">
            1,30,420 jobs listed here! Your dream job is waiting.
          </p>
          {/* Search Bar */}
          <div className="search-bar">
            <div className="search-group search-border">
              <div className="icon-box">
                <img
                  className="img-fluid"
                  src="/images/skill 1.png"
                  alt="Skill Icon"
                />
              </div>
              <input type="text" placeholder="Enter Skills" />
            </div>
            <div className="search-group search-border">
              <div className="icon-box">
                <img
                  className="img-fluid"
                  src="/images/best-customer-experience 1.png"
                  alt="Experience Icon"
                />
              </div>
              <select defaultValue="">
                <option value="" disabled>
                  Select Experience
                </option>
                <option value="fresher">Fresher</option>
                <option value="1-2">1-2 Years</option>
                <option value="3+">3+ Years</option>
              </select>
            </div>
            <div className="search-group">
              <div className="icon-box">
                <img
                  className="img-fluid"
                  src="/images/placeholder 1.png"
                  alt="Experience Icon"
                />
              </div>
              <input type="text" placeholder="Location" />
            </div>
            <button className="btn btn-primary">Search Jobs</button>
          </div>
          {/* Popular Tags */}
          <div className="popular-tags">
            <strong>Popular Searches:</strong>
            <span>Dentist</span>
            <span>Dental Assistant</span>
            <span>Dental Surgeon</span>
            <span>Orthodontist</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
