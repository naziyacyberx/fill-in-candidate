import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Card, Badge, Button, Spinner, ButtonGroup,
} from 'react-bootstrap';
import { FaVideo, FaUser } from 'react-icons/fa';
import Navbar from '../sections/common/Navbar';
import Footer from '../sections/common/Footer';

const getStatusVariant = (status) => {
  switch (status) {
    case 'Upcoming': return 'primary';
    case 'Completed': return 'success';
    case 'Today': return 'warning';
    case 'Expired': return 'danger';
    default: return 'secondary';
  }
};

const InterviewCard = (item) => (
  <Card className="p-3 h-100 shadow-sm">
    <div className="d-flex justify-content-between align-items-start mb-2">
      <Badge bg="light" text="dark" className="border px-2 py-1">
        {item.time}
      </Badge>
      <Badge bg={getStatusVariant(item.type)}>{item.type}</Badge>
    </div>
    <div className="d-flex align-items-center mb-2">
      <img
        src="/images/image.png"
        alt="Interviewer"
        className="rounded-circle me-3"
        style={{ width: 60, height: 60, objectFit: 'cover' }}
      />
      <div>
        <h6 className="mb-1">{item.clinic}</h6>
        <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
          {item.job_name}
        </p>
      </div>
    </div>
    <div className="d-flex gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
      <span className="d-flex align-items-center gap-1">
        <FaVideo /> Video Calling
      </span>
      <span className="d-flex align-items-center gap-1">
        <FaUser /> {item.candidate}
      </span>
    </div>
  </Card>
);

const ScheduleInterview = () => {
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Today");
  const token = localStorage.getItem("fillInToken");

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(
          'https://fill-in.cyberxinfosolution.com/api/candidate/interview-list',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.data?.data) {
          setInterviewData(response.data.data);
        } else {
          console.error('Error fetching interviews:', response?.data?.message);
        }
      } catch (error) {
        console.error('API Error:', error?.response?.data || error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [token]);

  const filteredInterviews = interviewData.filter(item => item.type === filter);

  return (
    <>
      <Navbar />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Schedule Interview</h3>
        </div>

    <div className="filter-buttons">

  {["Today", "Upcoming", "Completed", "Expired"].map((type) => (

     <button   onClick={() => setFilter(type)} className={filter === type ?  "active" : ""}>
       {type}
        </button>
  ))}
</div>



        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <Row className="g-3">
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((item, index) => (
                  <Col key={index} xs={12} sm={6} md={4}>
                    <InterviewCard {...item} />
                  </Col>
                ))
              ) : (
                <p className="text-muted text-center">No interviews found for "{filter}".</p>
              )}
            </Row>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ScheduleInterview;
