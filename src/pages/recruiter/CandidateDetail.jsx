import React, { useState, useEffect } from "react";
import { Card, Badge, Button, Spinner, Image } from "react-bootstrap";
import {
  FaUserCircle,
  FaCloudDownloadAlt,
  FaBriefcase,
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaComments,
  FaRegCheckCircle,
  FaCheck,
} from "react-icons/fa";
import "../../styles/recruiter/candidatedetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import JobApplicationsModal from "../../components/recruiter/JobApplicationsModal";

const CandidateDetail = () => {
  const navigate = useNavigate();
  const urlLocation = useLocation();
  const candidateId = urlLocation.state?.id;

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    console.log("candidateId",candidateId);
    
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(
          `https://fillin-admin.cyberxinfosolution.com/api/recruiter/view-applicants/${candidateId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGwtaW4uY3liZXJ4aW5mb3NvbHV0aW9uLmNvbS9hcGkvcmVjcnVpdGVyL2xvZ2luIiwiaWF0IjoxNzUwNjk2MTExLCJleHAiOjE3NTMyODgxMTEsIm5iZiI6MTc1MDY5NjExMSwianRpIjoiRlRySzk0WFAzSlRmRXpFbSIsInN1YiI6IjQzIiwicHJ2IjoiMTllNDNiOTdmMjAyOWU1MzA3MjMyMGM0Yzc3YzkwZDE1YjJjMzNmZCJ9.KXOd-uvQHkroBZEYYW2OQfIvKDRMIQ2N-ws-9kX4YWQ`,
            },
          }
        );
        setCandidate(response.data?.data || {});
      } catch (error) {
        console.error("Failed to fetch candidate details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (candidateId) fetchCandidate();
  }, [candidateId]);

 
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }



  if (!candidate) {
    return (
      <div className="text-center text-danger py-5">Candidate not found.</div>
    );
  }

  const {
    name,
    title,
    rating,
    review_count,
    qualification = [],
    software_experiance = [],
    language = [],
    location,
    preferred_location,
    expected_pay,
    short_notice,
    permanent_opportunities,
    year_of_experiance,
    type_of_experiance,  
    success_rate,
    compliance = [],
    childrens_check,
    valid_police_check,
    first_aid_certicate,
    additional_info,
    environment_thrive = [],
    fun_fact,
    profile,
    working_in_dentistry,
    id,
    document,
  } = candidate;

  return (
    <div className="container py-4">
      <h5>
        <strong>Candidate Profile</strong>
      </h5>   

      <div className="d-flex flex-column flex-md-row gap-3 mt-3">
        <Card className="flex-fill p-4 shadow-sm">
          <div className="row align-items-center">
            <div className="col-4">

            {profile ? (
              <Image
              src={profile}
              alt="Profile"
              roundedCircle
              width={160}
              height={160}
              className="me-3"
              />
            ) : (
              <FaUserCircle size={160} className="text-secondary me-3" />
            )}
            </div>

            <div className="col-8">
              <h4 className="mb-0">{name}</h4>
              <div className="text-muted small">{title}</div>
              <div className="text-warning small">
                ★ {rating} ({review_count} Reviews)
              </div>
              <div className="text-primary medium" role="button">
                Add a Review
              </div>
              <a        
              href={document}
              target="blank"
              >
              
              <Button variant="primary" size="sm" className="mt-2">
                <FaCloudDownloadAlt className="me-1" /> Download Resume
              </Button>
              </a>
            </div>
          </div>
        </Card>

        <div className="d-flex flex-column gap-2" style={{ minWidth: "380px" }}>
          

          
       <Card className="p-3 shadow-sm small">
            <div className="row align-items-center text-center text-md-start">
              <div className="col-3 d-flex justify-content-center align-items-center">
              <FaBriefcase className="text-primary fs-3"/>
              </div>
              <div className="col-9">
                <div>Experience</div>
                <strong>{year_of_experiance || "N/A"}</strong>
              </div>
            </div>
          </Card>    
          <Card className="p-3 shadow-sm small">
            <div className="row align-items-center text-center text-md-start">
              <div className="col-3 d-flex justify-content-center align-items-center">
                <FaClock className="text-primary fs-3" />
              </div>
              <div className="col-9">
                <div>Types of Experience</div>
                <strong>{type_of_experiance || "N/A"}</strong>
              </div>
            </div>
          </Card>    

          <Card className="p-3 shadow-sm small">
            <div className="row align-items-center text-center text-md-start">
              <div className="col-3 d-flex justify-content-center align-items-center">
                <FaCheckCircle className="text-success fs-3" />
              </div>
              <div className="col-9">
                <div>Success Rate</div>
                <strong>{success_rate || "99%"}</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <h6 className="mt-4">
        <strong>Qualification & Certification</strong>
      </h6>
      <ul className="list-unstyled mt-2">
        {qualification?.map((q, i) => (
          <li key={i} className="d-flex align-items-center mb-2">
            <FaRegCheckCircle className="text-primary me-2" />
            {q}
          </li>
        ))}
      </ul>

      <h6 className="mt-4">
        <strong>Software Expert</strong>
      </h6>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {software_experiance?.map((s, i) => (
          <Badge
            key={i}
            bg="light"
            text="dark"
            className="px-3 py-2 rounded-pill"
          >
            {s}
          </Badge>
        ))}
      </div>

      <h6 className="mt-4">
        <strong>Languages Spoken</strong>
      </h6>
      <div className="mt-2">
        {language?.map((lang, i) => (
          <span key={i}>✔ {lang} </span>
        ))}
      </div>

      <h6 className="mt-4">
        <strong>Location</strong>
      </h6>
      <div className="mt-1 text-muted">
        <FaMapMarkerAlt className="me-1" />
        {location || "Not specified"}
      </div>

      <h6 className="mt-4">
        <strong>Preferred Work Locations</strong>{" "}
        <span className="text-primary" role="button">
          Flexible on Pay
        </span>
      </h6>
      <div className="fw-bold mt-1">${expected_pay || "N/A"}</div>

      <div className="mt-4 ">
        <div className="form-control mt-1  d-flex justify-content-between">
          <label>
            <strong>Willing to Work on Short Notice?</strong>
          </label>
          {short_notice}
        </div>
      </div>
      <div className="mt-4 ">
        <div className="form-control mt-1  d-flex justify-content-between">
          <label>
            <strong>Open to Permanent Opportunities?</strong>
          </label>
         {permanent_opportunities}
        </div>
      </div>

    


<h6 className="mt-4">
  <strong>Compliance & Vaccination Status</strong>
</h6>

<ul className="list-unstyled mt-2">
  {compliance?.map((item, i) => (
    <li key={i} className="d-flex align-items-center py-2 border-bottom">
      <FaCheck className="text-primary me-2" size={12} />
      <span>{item}</span>
    </li>
  ))}
</ul>


      
      <div className="mt-4 ">
        <div className="form-control mt-1  d-flex justify-content-between">
          <label>
            <strong>Do you have a current Working with Children's Check?</strong>
          </label>
         {childrens_check}
        </div>
      </div>
      <div className="mt-4 ">
        <div className="form-control mt-1  d-flex justify-content-between">
          <label>
            <strong>Do you have a valid Police Check?</strong>
          </label>
        {valid_police_check}
        </div>
      </div>
      <div className="mt-4 ">
        <div className="form-control mt-1  d-flex justify-content-between">
          <label>
            <strong>Do you have a current first aid certificate?</strong>
          </label>
           {first_aid_certicate}
        </div>
      </div>

     

   
      <h6 className="mt-4">
        <strong>Personality & Additional Information</strong>
      </h6>
      <div className="bg-light p-3 rounded">
        {working_in_dentistry || "N/A"}
      </div>

      <h6 className="mt-4">
        <strong>What kind of work environment do you thrive in?</strong>
      </h6>
      <div className="mt-2 mb-4">
        {environment_thrive?.map((env, i) => (
          <Badge
            key={i}
            bg="light"
            text="dark"
            className="me-2 px-3 py-2 rounded-pill"
          >
            ✔ {env}
          </Badge>
        ))}
      </div>

      <h6>
        <strong>Fun Fact About You!</strong>
      </h6>
      <div className="bg-light p-3 rounded mb-4">{fun_fact || "N/A"}</div>
      <JobApplicationsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        candidateId={1}
        onSelectJob={(job) => {
          setSelectedJob(job);
          navigate(`/recruiter/schedule-interview/${id}`, {
            state: { user: { name, title, id }, job_id: job.id },
          });
        }}
      />

      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Schedule Interview
        </Button>

        {/* <Button variant="primary" onClick={()=>{navigate(`/recruiter/schedule-interview/${id}`, {state:{user: {name,title,id}}})}}>Schedule Interview</Button> */}
        <Button variant="outline-secondary">
          <FaPhone className="me-1" />
          Call
        </Button>
        <Button variant="outline-secondary">
          <FaComments className="me-1" />
          Start Chat
        </Button>
      </div>
    </div>
  );
};

export default CandidateDetail;
