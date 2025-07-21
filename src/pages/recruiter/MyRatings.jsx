import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Image, Button, Spinner } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const filterOptions = ["All Reviews", "Most Recent", "Highest Rated", "Less Rated"];

const renderStars = (rating) =>
  Array.from({ length: 5 }).map((_, i) => (
    <FaStar key={i} className={`me-1 ${i < rating ? "text-warning" : "text-muted"}`} />
  ));

const MyRatings = () => {
  const [activeFilter, setActiveFilter] = useState("Most Recent");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("fillInToken");
        const response = await axios.get(
          "https://fillin-admin.cyberxinfosolution.com/api/recruiter/view-profile",
          {
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGxpbi1hZG1pbi5jeWJlcnhpbmZvc29sdXRpb24uY29tL2FwaS9yZWNydWl0ZXIvbG9naW4iLCJpYXQiOjE3NTIyMjc0MjcsImV4cCI6MTc1NDgxOTQyNywibmJmIjoxNzUyMjI3NDI3LCJqdGkiOiJZMjY5b3pxSXY1RjdtcTRwIiwic3ViIjoiNjMiLCJwcnYiOiIxOWU0M2I5N2YyMDI5ZTUzMDcyMzIwYzRjNzdjOTBkMTViMmMzM2ZkIn0.43eywrXj1GX9zhAhOLU1zQtytCnhuDM5Z9zg7EMHous`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setProfileData(response.data.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading Ratings & Reviews...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger py-4">{error}</div>;
  }

  const getFilteredReviews = () => {
  if (!profileData?.reviews) return [];

  const reviews = [...profileData.reviews]; // create a shallow copy

  switch (activeFilter) {
    case "Most Recent":
      return reviews.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
    case "Highest Rated":
      return reviews.sort((a, b) => parseInt(b.rate) - parseInt(a.rate));
    case "Less Rated":
      return reviews.sort((a, b) => parseInt(a.rate) - parseInt(b.rate));
    case "All Reviews":
    default:
      return reviews;
  }
};

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h5><strong>Ratings & Reviews</strong></h5>

      {/* Recruiter Profile Header */}
      {profileData && (
        <Card className="p-3 mt-3 d-flex flex-row align-items-center gap-3 shadow-sm">
          <Image
            src={profileData.profile || "https://via.placeholder.com/60"}
            roundedCircle
            width={60}
            height={60}
          />
          <div className="flex-grow-1">
            <h6 className="mb-0">{profileData.name}</h6>
            <div className="text-primary small">{profileData.profession}</div>
          </div>
          <div className="text-end">
            <h4 className="mb-0">{profileData.rating}</h4>
            <div className="text-warning small">
              {renderStars(profileData.rating)}{" "}
              <span className="text-muted">({profileData.reviews?.length || 0} Reviews)</span>
            </div>
          </div>
        </Card>
      )}

      {/* Filter Buttons */}
      <div className="d-flex flex-wrap gap-2 mt-4">
        {filterOptions.map((label) => (
          <Button
            key={label}
            variant={activeFilter === label ? "primary" : "outline-primary"}
            className="rounded-pill px-3 py-1"
            onClick={() => setActiveFilter(label)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Reviews */}
      <div className="mt-4">
        {profileData?.reviews?.length > 0 ? (
         getFilteredReviews().map((review) => (
        //   profileData.reviews.map((review) => (
            <Card key={review.id} className="p-3 mb-3 shadow-sm">
              <div className="d-flex align-items-start gap-3">
                <Image
                  src={review.candidate_image || "https://via.placeholder.com/50"}
                  roundedCircle
                  width={50}
                  height={50}
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{review.candidate_name}</h6>
                      <div className="text-primary small">{review.clinic_name}</div>
                    </div>
                    <div className="text-muted small">
                      {new Date(review.created).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-warning my-1">{renderStars(parseInt(review.rate))}</div>
                  <p className="mb-0 text-muted small">{review.comment}</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default MyRatings;
