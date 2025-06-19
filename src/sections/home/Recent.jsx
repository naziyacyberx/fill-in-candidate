import React from 'react'
import "../../styles/recent.css"

const Recent = () => {
  return (
<>
<section className="recent-applicants">
  <div className="container">
    <p className="card-title-section mb-4">
      Recent <span>Clinics</span>
    </p>
    <p className="text-muted mb-5">
      Search and connect with the right candidates faster
    </p>
    <div className="row justify-content-center">
      {/* Repeatable card */}
      {/* CARD START */}
      <div className="col-md-6 col-lg-4 col-sm-6">
        <div className="applicant-card d-flex align-items-center">
          <img
            src="images/applicant.png"
            className="applicant-img"
            alt="Dr. Sarah Johnson"
          />
          <div className="text-start">
            <div className="applicant-name">Dr. Sarah Johnson</div>
            <div className="applicant-role">General Dentist</div>
            <div className="applicant-namess">
              {" "}
              <span>
                <img src="img/new_releases.png" alt="" />
                3+ year
              </span>
            </div>
            <div className="applicant-meta">
              <span className="rating">★ 3.5 (128 Reviews)</span>
            </div>
          </div>
        </div>
      </div>
      {/* CARD END */}
      {/* Repeating 5 more times for layout preview */}
      <div className="col-md-6 col-lg-4 col-sm-6">
        <div className="applicant-card d-flex align-items-center">
          <img
          src="images/applicant.png"
            className="applicant-img"
            alt="Dr. Sarah Johnson"
          />
          <div className="text-start">
            <div className="applicant-name">Dr. Sarah Johnson</div>
            <div className="applicant-role">General Dentist</div>
            <div className="applicant-namess">
              {" "}
              <span>
                <img src="img/new_releases.png" alt="" />
                3+ year
              </span>
            </div>
            <div className="applicant-meta">
              <span className="rating">★ 3.5 (128 Reviews)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 col-sm-6">
        <div className="applicant-card d-flex align-items-center">
          <img
            src="images/applicant.png"
            className="applicant-img"
            alt="Dr. Sarah Johnson"
          />
          <div className="text-start">
            <div className="applicant-name">Dr. Sarah Johnson</div>
            <div className="applicant-role">General Dentist</div>
            <div className="applicant-namess">
              {" "}
              <span>
                <img src="img/new_releases.png" alt="" />
                3+ year
              </span>
            </div>
            <div className="applicant-meta">
              <span className="rating">★ 3.5 (128 Reviews)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 col-sm-6">
        <div className="applicant-card d-flex align-items-center">
          <img
       src="images/applicant.png"
            className="applicant-img"
            alt="Dr. Sarah Johnson"
          />
          <div className="text-start">
            <div className="applicant-name">Dr. Sarah Johnson</div>
            <div className="applicant-role">General Dentist</div>
            <div className="applicant-namess">
              {" "}
              <span>
                <img src="img/new_releases.png" alt="" />
                3+ year
              </span>
            </div>
            <div className="applicant-meta">
              <span className="rating">★ 3.5 (128 Reviews)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 col-sm-6">
        <div className="applicant-card d-flex align-items-center">
          <img
           src="images/applicant.png"
            className="applicant-img"
            alt="Dr. Sarah Johnson"
          />
          <div className="text-start">
            <div className="applicant-name">Dr. Sarah Johnson</div>
            <div className="applicant-role">General Dentist</div>
            <div className="applicant-namess">
              {" "}
              <span>
                <img src="img/new_releases.png" alt="" />
                3+ year
              </span>
            </div>
            <div className="applicant-meta">
              <span className="rating">★ 3.5 (128 Reviews)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 col-sm-6">
        <div className="applicant-card d-flex align-items-center">
          <img
          src="images/applicant.png"
            className="applicant-img"
            alt="Dr. Sarah Johnson"
          />
          <div className="text-start">
            <div className="applicant-name">Dr. Sarah Johnson</div>
            <div className="applicant-role">General Dentist</div>
            <div className="applicant-namess">
              {" "}
              <span>
                <img src="img/new_releases.png" alt="" />
                3+ year
              </span>
            </div>
            <div className="applicant-meta">
              <span className="rating">★ 3.5 (128 Reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button className="see-all-btn">See All</button>
  </div>
</section>

</>
  )
}

export default Recent
