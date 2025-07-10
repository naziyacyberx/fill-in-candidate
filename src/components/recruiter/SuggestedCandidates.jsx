import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CandidateCard = ({ candidate }) => {
  const {
    name,
    profession,
    hourly_rate,
    year_of_experiance,
    location,
    rating,
    review_count,
    profile
  } = candidate;
  const navigate = useNavigate()

  return (
    <Card className="mb-3 shadow-sm rounded cursor-pointer" style={{ minHeight: '100px' }}
    
     onClick={()=>{
          navigate(`/recruiter/candidate-detail/${candidate.id}`,{
            state:{id:candidate.id}
          })
        }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={profile || "/images/applicant.png"}
            alt="Candidate"
            style={{
              width: 100,
              height: 80,
              objectFit: 'cover',
              borderRadius: 8,
              marginRight: 15,
            }}
          />
          <div>
            <h6 className="mb-1">{name}</h6>
            <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
              {profession || 'N/A'}
            </p>
            <div style={{ fontSize: '0.8rem', color: '#555' }}>
              <span className="me-3">{year_of_experiance}</span>
              <span>{location || 'Location N/A'}</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#555' }}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < Math.round(rating) ? '#ffc107' : '#ddd'}
                  size={14}
                />
              ))}{' '}
              ({review_count} Reviews)
            </div>
          </div>
        </div>
        <div className="text-end">
          <div className="fw-bold text-primary">${hourly_rate}/hour</div>
          <div style={{ fontSize: '0.8rem', color: '#1c64f2' }}>
            Flexible on Pay
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const SuggestedCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          'https://fillin-admin.cyberxinfosolution.com/api/dashboard',
          {
            params: { search: 'Dental Assistant' },
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: {
              experiance_level: ['4 Years'],
            },
          }
        );

        if (response.data?.data?.candidate) {
          setCandidates(response.data.data.candidate);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="container mt-4">
      <h5><strong>Suggested Candidates For You</strong></h5>
      <div className="row">
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : candidates.length > 0 ? (
          candidates.map((candidate, idx) => (
            <div className="col-md-6" key={idx}>
              <CandidateCard candidate={candidate} />
            </div>
          ))
        ) : (
          <p>No candidates found.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedCandidates;
