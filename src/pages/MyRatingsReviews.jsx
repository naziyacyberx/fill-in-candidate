



import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  Image,
  Spinner,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Navbar from "../sections/common/Navbar";
import Footer from "../sections/common/Footer";
import axios from "axios";

const MyRatingsReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Reviews");

  const token = localStorage.getItem("fillInToken");

  useEffect(() => {
    const fetchProfileAndReviews = async () => {
      try {
        const response = await axios.get(
          "https://fill-in.cyberxinfosolution.com/api/candidate/view-profile",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.status === "success") {
          const data = response.data.data;
          setProfile(data);
          setReviews(data.reviews || []);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndReviews();
  }, []);

  const getStarIcons = (rating) =>
    [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        color={index < rating ? "#f5c518" : "#ddd"}
        size={16}
      />
    ));

  const getDaysAgo = (dateStr) => {
    const date = new Date(dateStr);
    const diff = Math.floor((new Date() - date) / (1000 * 3600 * 24));
    return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
  };

  const getFilteredReviews = () => {
  if (filter === "Most Recent") {
    return [...reviews].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  if (filter === "Highest Rated") {
    return [...reviews].sort((a, b) => b.rate - a.rate);
  }

  return reviews;
};


  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h4 className="fw-bold mb-4">My Ratings & Reviews</h4>

        <ButtonGroup className="mb-4">
          {["All Reviews", "Most Recent", "Highest Rated"].map((label) => (
            <Button
              key={label}
              variant={filter === label ? "primary" : "outline-primary"}
              onClick={() => setFilter(label)}
              className="rounded-pill px-4 mx-2"
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row className="gy-4">
            {reviews.length > 0 ? (
              getFilteredReviews().map((review) => (
                <Col md={12} key={review.id}>
                  <Card className="p-3 shadow-sm">
                    <div className="d-flex align-items-start">
                      <Image
                        src={review.Clinic_profile || "/images/profile-placeholder.png"}
                        roundedCircle
                        width={60}
                        height={60}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="mb-1 fw-bold">
                              {review.clinic_name}
                            </h6>
                            <small className="text-primary">
                              {review.recruiter_name}
                            </small>
                          </div>
                          <small className="text-muted">
                            {getDaysAgo(review.created)}
                          </small>
                        </div>
                        <div className="my-2">
                          {getStarIcons(parseInt(review.rate))}
                        </div>
                        <p className="mb-0 text-muted" style={{ fontSize: "0.95rem" }}>
                          {review.comment || "No comment provided."}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No reviews found.</p>
            )}
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default MyRatingsReviews;

