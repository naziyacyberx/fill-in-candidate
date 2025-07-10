import React, { useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const filterOptions = ["All Reviews", "Most Recent", "Highest Rated", "Less Rated"];

const dummyReviews = [
  {
    id: 1,
    name: "Bright Smile Dental",
    profession: "Senior Dentist",
    rating: 4,
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...",
    time: "2 days ago",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Bright Smile Dental",
    profession: "Senior Dentist",
    rating: 5,
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...",
    time: "1 day ago",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Bright Smile Dental",
    profession: "Senior Dentist",
    rating: 3,
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...",
    time: "3 days ago",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Bright Smile Dental",
    profession: "Senior Dentist",
    rating: 5,
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...",
    time: "4 days ago",
    avatar: "https://via.placeholder.com/50",
  },
];

const renderStars = (rating) =>
  Array.from({ length: 5 }).map((_, i) => (
    <FaStar key={i} className={`me-1 ${i < rating ? "text-warning" : "text-muted"}`} />
  ));

const MyRatings = () => {
  const [activeFilter, setActiveFilter] = useState("Most Recent");

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h5><strong>Ratings & Reviews</strong></h5>

      {/* Header */}
      <Card className="p-3 mt-3 d-flex flex-row align-items-center gap-3 shadow-sm">
        <Image src="https://via.placeholder.com/60" roundedCircle />
        <div className="flex-grow-1">
          <h6 className="mb-0">Bright Smile Dental</h6>
          <div className="text-primary small">Senior Dentist</div>
        </div>
        <div className="text-end">
          <h4 className="mb-0">4</h4>
          <div className="text-warning small">
            {renderStars(4)} <span className="text-muted">(2 Reviews)</span>
          </div>
        </div>
      </Card>

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

      {/* Review Cards */}
      <div className="mt-4">
        {dummyReviews.map((review) => (
          <Card key={review.id} className="p-3 mb-3 shadow-sm">
            <div className="d-flex align-items-start gap-3">
              <Image src={review.avatar} roundedCircle width={50} height={50} />
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">{review.name}</h6>
                    <div className="text-primary small">{review.profession}</div>
                  </div>
                  <div className="text-muted small">{review.time}</div>
                </div>
                <div className="text-warning my-1">{renderStars(review.rating)}</div>
                <p className="mb-0 text-muted small">{review.comment}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyRatings;
