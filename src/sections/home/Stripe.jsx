import React from 'react'
import "../../styles/stripe.css"
import { useNavigate } from 'react-router-dom'

const Stripe = () => {
  const navigate = useNavigate()
  return (
<>
<section className="dream-job-section">
  <div className="container">
    <p className="card-title-section mb-4">Your Dream Jobs Are Waiting</p>
    <p className="text-muted mb-3">
      Over 1 million interactions, 1200 success stories. Make yours now.
    </p>
    <div className="d-flex flex-wrap justify-content-center">
      {/* <button className="btn btn-white">Search Jobs</button> */}
      <button className="btn btn-blue" onClick={()=> navigate("/jobs")}>Apply Job Now</button>
    </div>
  </div>
</section>

</>
  )
}

export default Stripe
