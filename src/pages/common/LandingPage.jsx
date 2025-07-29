import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaEnvelope, FaUserCircle, FaBell } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import axios from "axios";
import "../../styles/banner.css";
import "../../styles/navbar.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navbar logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);



  useEffect(() => {
    const token = localStorage.getItem("fillInToken");
 
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  // Modal for portal switch
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const portal = sessionStorage.getItem("selectedPortal");
    if (portal !== "candidate") {
      setShowModal(true);
    }
  }, []);

  return (
    <>
      {/* ======= Navbar (No import) ======= */}
      {/* Desktop Navbar */}
      <section className="nav-main py-4 d-lg-block d-none">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-3">
              <img
                onClick={() => navigate("/")}
                className="img-fluid logo"
                src="/images/logo.png"
                alt="Logo"
              />
            </div>
            <div className="col-9 text-end position-relative">
              <div className="btn-nav">
                {isLoggedIn ? (
              <>
              </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        navigate("/candidate/", {
                        })
                      }
                      className="btn-login"
                    >
                      Candidate
                    </button>
                    <button
                      onClick={() => navigate("/recruiter")}
                      className="btn-register"
                    >
                      Recruiter
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Navbar */}
      <section className="nav-main py-2 d-lg-none d-block">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <img
                onClick={() => navigate("/candidate/")}
                className="img-fluid"
                src="/images/logo.png"
                alt="Logo"
              />
            </div>
            <div className="col-7 nav-col">
              <FaBars onClick={() => setShow(true)} />
            </div>
          </div>
        </div>
      </section>

  

      {/* ======= Hero Section ======= */}
      <section className="hero-section landing-page" >
        <div className="container">
          {showModal && (
            <div className="custom-popup-overlay">
              <div className="custom-popup-box d-flex">
                <div className="popup-right">
                  <img
                    src="/images/popup-image.png"
                    alt="Dental Illustration"
                    className="popup-illustration"
                  />
                </div>
                <div className="popup-left d-flex flex-column justify-content-center align-items-start p-4">
                  <img
                    src="/images/logo.png"
                    alt="Fill-In Logo"
                    className="popup-logo mb-3"
                  />
                  <h4 className="fw-bold mb-2">
                    Looking for Your Next Dental{" "}
                    <span className="text-primary">Opportunity?</span>
                  </h4>
                  <p className="mb-4 text-muted" style={{ maxWidth: "350px" }}>
                    Join top dental clinics hiring now. Find the best-fit job
                    that values your skills and passion.
                  </p>
                  
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-primary px-4"
                      onClick={() => {
                        sessionStorage.setItem("selectedPortal", "candidate");
                          navigate("/candidate");
                        setShowModal(false);
                      }}
                    >
                      Go to Candidate
                    </button>
                    <button
                      className="btn btn-outline-primary px-4"
                      onClick={() => {
                        sessionStorage.setItem("selectedPortal", "recruiter");
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
          <p className="mt-3">
            1,30,420 jobs listed here! Your dream job is waiting.
          </p>


            <h3>
Find the right dental professionals to help your clinic grow and thrive. Whether you're looking for experienced dentists, skilled assistants, or reliable support staff, our platform connects you with qualified candidates who are ready to join your team.
</h3>

        </div>
      </section>

  {/* ======= stripe ======= */}
      <section className="dream-job-section">
  <div className="container">
    <p className="card-title-section mb-4">Your Dream Jobs Are Waiting</p>
    <p className="text-muted mb-3">
      Over 1 million interactions, 1200 success stories. Make yours now.
    </p>
    <div className="d-flex flex-wrap justify-content-center">
      {/* <button className="btn btn-white">Search Jobs</button> */}
      {/* <button className="btn btn-blue" >Apply Job Now</button> */}
    </div>
  </div>
</section>
    </>
  );
};

export default LandingPage;
