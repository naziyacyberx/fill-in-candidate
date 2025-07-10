// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Card, Button } from 'react-bootstrap';
// import { FaClock, FaMapMarkerAlt, FaStar, FaUserMd, FaEnvelope, FaPhone } from 'react-icons/fa';
// import axios from 'axios';

// const CandidateDetail = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const candidateId = location.state?.id;
//   console.log("cid", candidateId);
  
//   const [candidate, setCandidate] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCandidate = async () => {
//       try {
//         const response = await axios.get(
//           `https://fillin-admin.cyberxinfosolution.com/api/recruiter/view-applicants/${candidateId}`,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Accept: 'application/json',
//               Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGwtaW4uY3liZXJ4aW5mb3NvbHV0aW9uLmNvbS9hcGkvcmVjcnVpdGVyL2xvZ2luIiwiaWF0IjoxNzUwNjk2MTExLCJleHAiOjE3NTMyODgxMTEsIm5iZiI6MTc1MDY5NjExMSwianRpIjoiRlRySzk0WFAzSlRmRXpFbSIsInN1YiI6IjQzIiwicHJ2IjoiMTllNDNiOTdmMjAyOWU1MzA3MjMyMGM0Yzc3YzkwZDE1YjJjMzNmZCJ9.KXOd-uvQHkroBZEYYW2OQfIvKDRMIQ2N-ws-9kX4YWQ`
//             }
//           }
//         );
//         setCandidate(response.data?.data || {});
//       } catch (error) {
//         console.error('Failed to fetch candidate details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (candidateId) {
//       fetchCandidate();
//     }
//   }, [candidateId]);

//   if (loading) return <div className="container mt-5">Loading...</div>;
//   if (!candidate) return <div className="container mt-5">No candidate data found.</div>;

//   return (
//     <div className="container mt-4">
//       <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
//         ← Back
//       </Button>
//       <Card className="shadow-sm p-4">
//         <div className="d-flex align-items-start mb-4">
//           <img
//             src={candidate.profile || '/images/tooth.png'}
//             alt="Candidate"
//             style={{ width: 120, height: 100, objectFit: 'cover', borderRadius: 10, marginRight: 20 }}
//           />
//           <div>
//             <h4 className="mb-1">{candidate.name}</h4>
//             <p className="text-muted mb-1">
//               <FaUserMd className="me-2" /> {candidate.profession}
//             </p>
//             <p className="text-muted mb-1">
//               <FaMapMarkerAlt className="me-2" /> {candidate.location || 'Location N/A'}
//             </p>
//             <p className="text-muted">
//               <FaClock className="me-2" /> {candidate.year_of_experiance}
//             </p>
//             <div className="mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <FaStar
//                   key={i}
//                   color={i < candidate?.rating ? '#ffc107' : '#ddd'}
//                   size={16}
//                 />
//               ))}
//             </div>
//             <h5 className="text-primary fw-bold">
//               {candidate?.hourly_rate ? `₹${candidate.hourly_rate}/hour` : 'Flexible on Pay'}
//             </h5>
//           </div>
//         </div>

//         {candidate?.email && (
//           <p className="text-muted">
//             <FaEnvelope className="me-2" /> {candidate.email}
//           </p>
//         )}

//         {candidate?.phone && (
//           <p className="text-muted">
//             <FaPhone className="me-2" /> {candidate.phone}
//           </p>
//         )}

//         {candidate?.description && (
//           <div className="mt-4">
//             <h6>Description</h6>
//             <p>{candidate.description}</p>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default CandidateDetail;


import React,{useState, useEffect} from "react";
import { Card, Badge, Button, Spinner } from "react-bootstrap";
import {
  FaUserCircle,
  FaCloudDownloadAlt,
  FaBriefcase,
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaComments,
} from "react-icons/fa";
import "../../styles/recruiter/candidatedetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CandidateDetail = () => {
  const navigate = useNavigate()
  const urlLocation = useLocation();
  const candidateId = urlLocation.state?.id;

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    return <div className="text-center text-danger py-5">Candidate not found.</div>;
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
    id
  } = candidate;

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <h5><strong>Candidate Profile</strong></h5>

         <div className="d-flex flex-column flex-md-row gap-3 mt-3">
        <Card className="flex-fill p-3 shadow-sm">
          <div className="d-flex align-items-center">
            {profile ? (
              <img src={profile} alt="Profile" roundedCircle width={60} height={60} className="me-3" />
            ) : (
              <FaUserCircle size={60} className="text-secondary me-3" />
            )}
            <div>
              <h6 className="mb-0">{name}</h6>
              <div className="text-muted small">{title}</div>
              <div className="text-warning small">★ {rating} ({review_count} Reviews)</div>
              <div className="text-primary small" role="button">Add a Review</div>
              <Button variant="primary" size="sm" className="mt-2">
                <FaCloudDownloadAlt className="me-1" /> Download Resume
              </Button>
            </div>
          </div>
        </Card>

        <div className="d-flex flex-column gap-2" style={{ minWidth: "180px" }}>
          <Card className="p-2 text-center shadow-sm small">
            <FaBriefcase className="text-primary mb-1" />
            <div>Experience</div>
            <strong>{year_of_experiance || "N/A"}</strong>
          </Card>
          <Card className="p-2 text-center shadow-sm small">
            <FaClock className="text-primary mb-1" />
            <div>Types of Experience</div>
            <strong>{type_of_experiance || "N/A"}</strong>
          </Card>
          <Card className="p-2 text-center shadow-sm small">
            <FaCheckCircle className="text-success mb-1" />
            <div>Success Rate</div>
            <strong>{success_rate || "99%"}</strong>
          </Card>
        </div>
      </div>

      <h6 className="mt-4"><strong>Qualification & Certification</strong></h6>
      <ul className="list-unstyled mt-2">
        {qualification.map((q, i) => (
          <li key={i}>✔ {q}</li>
        ))}
      </ul>

      <h6 className="mt-4"><strong>Software Expert</strong></h6>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {software_experiance.map((s, i) => (
          <Badge key={i} bg="light" text="dark" className="px-3 py-2 rounded-pill">
            {s}
          </Badge>
        ))}
      </div>

      <h6 className="mt-4"><strong>Languages Spoken</strong></h6>
      <div className="mt-2">
        {language.map((lang, i) => (
          <span key={i}>✔ {lang} </span>
        ))}
      </div>

      <h6 className="mt-4"><strong>Location</strong></h6>
      <div className="mt-1 text-muted">
        <FaMapMarkerAlt className="me-1" />
        {location || "Not specified"}
      </div>

      <h6 className="mt-4">
        <strong>Preferred Work Locations</strong>{" "}
        <span className="text-primary" role="button">Flexible on Pay</span>
      </h6>
      <div className="fw-bold mt-1">${expected_pay || "N/A"}</div>

      <div className="mt-4">
        <label><strong>Willing to Work on Short Notice?</strong></label>
        <div className="form-control mt-1 text-success">{short_notice}</div>
      </div>

      <div className="mt-3">
        <label><strong>Open to Permanent Opportunities?</strong></label>
        <div className="form-control mt-1 text-success">{permanent_opportunities}</div>
      </div>

      <h6 className="mt-4"><strong>Compliance & Vaccination Status</strong></h6>
      <ul className="list-unstyled mt-2">
        {compliance.map((item, i) => (
          <li key={i}>✔ {item}</li>
        ))}
      </ul>

      <div className="mt-4">
        <label><strong>Do you have a current Working with Children's Check?</strong></label>
        <div className="form-control mt-1 text-success">{childrens_check}</div>
      </div>

      <div className="mt-3">
        <label><strong>Do you have a valid Police Check?</strong></label>
        <div className="form-control mt-1 text-success">{valid_police_check}</div>
      </div>

      <div className="mt-3">
        <label><strong>Do you have a current first aid certificate?</strong></label>
        <div className="form-control mt-1 text-success">{first_aid_certicate }</div>
      </div>

      <h6 className="mt-4"><strong>Personality & Additional Information</strong></h6>
      <div className="bg-light p-3 rounded">
        {working_in_dentistry || "N/A"}
      </div>

      <h6 className="mt-4"><strong>What kind of work environment do you thrive in?</strong></h6>
      <div className="mt-2 mb-4">
        {environment_thrive.map((env, i) => (
          <Badge key={i} bg="light" text="dark" className="me-2 px-3 py-2 rounded-pill">
            ✔ {env}
          </Badge>
        ))}
      </div>

      <h6><strong>Fun Fact About You!</strong></h6>
      <div className="bg-light p-3 rounded mb-4">
        {fun_fact || "N/A"}
      </div>

      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={()=>{navigate(`/recruiter/schedule-interview/${id}`, {state:{user: {name,title,id}}})}}>Schedule Interview</Button>
        <Button variant="outline-secondary"><FaPhone className="me-1" />Call</Button>
        <Button variant="outline-secondary"><FaComments className="me-1" />Start Chat</Button>
      </div>
    </div>
  );
};

export default CandidateDetail;
