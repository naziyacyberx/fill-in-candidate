import React from 'react'
import "../../styles/cardbox.css";

const Hiring = () => {
  return (
<>
<section className="hiring-section">
  <div className="container">
    <div className="hiring-box bg-light">
      {/* Hiring Content */}
      <div className="hiring-content">
        <div className="row align-items-center text-center gx-3 gy-3 justify-content-center">
          {/* Column 1 */}
          <div className="col-12 col-md-3 ">
            <h6 className="mb-1">
              <strong>WE ARE</strong>
            </h6>
            <h2 className="fw-bold m-0">HIRING</h2>
          </div>
          {/* Column 2 */}
          <div className="col-12 col-md-3">
            <p className="text-muted mb-0 text-justify">
              Let's Work Together &amp; Explore Opportunities
            </p>
          </div>
          {/* Column 3 */}
          <div className="col-12 col-md-3 d-flex justify-content-center text-md-start ">
            <a href="#" className="hiring-btn">
              Search Jobs
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</>
  )
}

export default Hiring
