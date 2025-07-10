

// JobCategory.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FaClock, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import PaginationComponent from '../../components/recruiter/PaginationComponent';

const JobCard = ({ job }) => {
  const navigate = useNavigate()
  return (
    <Card className="mb-3 shadow-sm rounded cursor-pointer"  style={{ minHeight: '100px' }}   
    onClick={()=>{
          navigate(`/recruiter/candidate-detail/${job.id}`,{
            state:{id:job.id}
          })
        }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center" >
          <img
            src={job.profile || '/images/tooth.png'}
            alt="Clinic Logo"
            style={{
              width: 100,
              height: 80,
              objectFit: 'cover',
              borderRadius: 8,
              marginRight: 15,
            }}
          />
          <div>
            <h6 className="mb-1">{job.name}</h6>
            <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
              {job.profession}
            </p>
            <div style={{ fontSize: '0.8rem', color: '#555' }}>
              <span className="me-3">
                <FaClock className="me-1" />
                {job.year_of_experiance}
              </span>
              <span>
                <FaMapMarkerAlt className="me-1" />
                {job.location || 'Location N/A'}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#555' }}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < job?.rating ? '#ffc107' : '#ddd'}
                  size={14}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-end">
          {job?.hourly_rate ? (
            <div className="fw-bold text-primary">
              ₹{job.hourly_rate}/hour
            </div>
          ) : (
            <div style={{ fontSize: '0.8rem', color: '#1c64f2' }}>
              Flexible on Pay
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

const JobCategory = () => {
  const location = useLocation();
  const originalCandidates = location.state?.candidates || [];
  const [candidates, setCandidates] = useState(originalCandidates);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 8;

  const applyFilter = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to page 1 when filter changes

    switch (filter) {
   case 'High Pay':
  setCandidates(
    originalCandidates
      .filter((job) => {
        const rate = Number(job.hourly_rate);
        return !isNaN(rate) && typeof rate === 'number';
      })
      .slice()
      .sort((a, b) => Number(b.hourly_rate) - Number(a.hourly_rate))
  );
  break;
case 'Low Pay':
  setCandidates(
    originalCandidates
      .filter((job) => {
        const rate = Number(job.hourly_rate);
        return !isNaN(rate) && typeof rate === 'number';
      })
      .slice()
      .sort((a, b) => Number(a.hourly_rate) - Number(b.hourly_rate))
  );
  break;
      case 'Top Rated':
        setCandidates(originalCandidates.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0)));
        break;
      case 'Flexible Pay':
        setCandidates(originalCandidates.filter((job) => !job.hourly_rate));
        break;
      default:
        setCandidates(originalCandidates);
    }
  };

  const totalPages = Math.ceil(candidates.length / candidatesPerPage);
  const paginatedJobs = candidates.slice((currentPage - 1) * candidatesPerPage, currentPage * candidatesPerPage);

  return (
    <div className="container mt-4">
      <h5><strong>{originalCandidates[0]?.profession || 'Profession'} </strong></h5>
      <p className="text-muted mb-3">
        Showing {candidates.length} candidate{candidates.length !== 1 ? 's' : ''}
      </p>

      {/* Filter buttons */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        {['All', 'High Pay', 'Low Pay', 'Top Rated', 'Flexible Pay'].map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? 'primary' : 'outline-primary'}
            onClick={() => applyFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="row">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job, index) => (
            <div className="col-md-6" key={index}>
              <JobCard job={job} />
            </div>
          ))
        ) : (
          <p>No candidates available for this filter.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default JobCategory;
