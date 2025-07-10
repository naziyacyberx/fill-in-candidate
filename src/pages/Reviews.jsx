import "../styles/reviews.css";
import React, { useEffect, useState } from "react";
import Navbar from "../sections/common/Navbar";
import Footer from "../sections/common/Footer";
import {
  TiStarFullOutline,
  TiStarOutline,
  TiStarHalfOutline,
} from "react-icons/ti";
import { IoMdStar } from "react-icons/io";
import { viewClinicApi } from "../apis/ViewClinicApi";
import { addReviewApi } from "../apis/AddReviewApi";
import { useParams } from "react-router-dom";
import { ErrorToaster, SuccessToaster } from "../utils/Toaster";

const Reviews = () => {
  const { id } = useParams();
  const [clinicDetails, setClinicDetails] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [isReviewGiven, setIsReviewGiven] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


useEffect(() => {
  const fetchClinicDetails = async () => {
    try {
      const token = localStorage.getItem("fillInToken");
      setIsLoggedIn(!!token); 

      const response = await viewClinicApi(id);
      const details = response?.data?.data;
      setClinicDetails(details);
      setFilteredReviews(details?.reviews || []);
      setIsReviewGiven(details?.is_review === 1);
    } catch (error) {
      console.error("Failed to fetch clinic details:", error);
    }
  };
  fetchClinicDetails();
}, [id]);



const handleSubmitReview = async () => {
  if (rate < 1 || rate > 5) {
    ErrorToaster("Please select a rating between 1 to 5");
    return;
  }
  if (!comment.trim()) {
    ErrorToaster("Please write a comment");
    return;
  }

  const payload = {
    rate,
    recruiter_id: Number(id),
    comment: comment.trim(),
    image: "",
  };

  try {
    await addReviewApi(payload);
    setComment("");
    setRate(0);

    // ✅ Update review status immediately
    setIsReviewGiven(true);

    // Optional: Refetch data to refresh UI
    const response = await viewClinicApi(id);
    setFilteredReviews(response?.data?.data?.reviews || []);
  } catch (error) {
    // Error already handled in addReviewApi
  }
};


  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400)
      return `${Math.floor(diff / 3600)} hour${
        Math.floor(diff / 3600) > 1 ? "s" : ""
      } ago`;
    if (diff < 2592000)
      return `${Math.floor(diff / 86400)} day${
        Math.floor(diff / 86400) > 1 ? "s" : ""
      } ago`;
    if (diff < 31104000) return `${Math.floor(diff / 2592000)} month ago`;
    return `${Math.floor(diff / 31104000)} year ago`;
  };

  // Combined function for rendering stars for any rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const totalStars = 5;

    for (let i = 0; i < fullStars; i++)
      stars.push(<TiStarFullOutline key={`full-${i}`} />);
    if (halfStar) stars.push(<TiStarHalfOutline key="half" />);
    for (let i = stars.length; i < totalStars; i++)
      stars.push(<TiStarOutline key={`empty-${i}`} />);

    return stars;
  };

  const ratings = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 50 },
    { stars: 3, percent: 30 },
    { stars: 2, percent: 12 },
    { stars: 1, percent: 4 },
  ];

  const sortByRecent = () => {
    const sorted = [...(clinicDetails?.reviews || [])].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
    setFilteredReviews(sorted);
    setActiveFilter("recent");
  };

  const sortByRating = () => {
    const sorted = [...(clinicDetails?.reviews || [])].sort(
      (a, b) => b.rate - a.rate
    );
    setFilteredReviews(sorted);
    setActiveFilter("rating");
  };

  const showAllReviews = () => {
    setFilteredReviews(clinicDetails?.reviews || []);
    setActiveFilter("all");
  };

  if (!clinicDetails) return <p>Loading...</p>;

  return (
    <>
      {/* <Navbar /> */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="review-main-heading">Ratings & Reviews</h2>
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="view-clinic__profile review_profile">
                <img
                  src={clinicDetails.profile || "/images/dummy-img.png"}
                  alt="profile"
                  className="view-clinic__profile-img view_rating_profile_img"
                />
                <div className="view-clinic__profile-info">
                  <h5>{clinicDetails.name}</h5>
                  <p>{clinicDetails.practice_name}</p>
                  <div className="view-clinic__stars">
                    {renderStars(clinicDetails.rating.toFixed(1))}
                  </div>
                  <h2 className="review-start-heading">
                    {clinicDetails.rating.toFixed(1)}{" "}
                    <span className="text-warning">
                      <IoMdStar />
                    </span>
                  </h2>
                  <div className="view-clinic__badge">
                    From {clinicDetails.established_year}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="range-slide-section">
        <div className="container rating-slide-container py-4">
          <div className="row align-items-center">
            <div className="col-md-3 text-center mb-3 mb-md-0">
              <div className="rating-slide-score">
               <h2>
  {Number(clinicDetails.rating).toFixed(1)}{" "}
  <span className="text-warning">
    <IoMdStar />
  </span>
</h2>

                <p>({clinicDetails.review_count} Reviews)</p>
              </div>
            </div>
            <div className="col-md-9 range-main">
              <h6 className="rating-slide-title">Rating Distribution</h6>
              {ratings.map(({ stars, percent }, index) => (
                <div
                  key={index}
                  className="rating-slide-bar d-flex align-items-center mb-2"
                >
                  <div className="rating-slide-star me-2">
                    {stars}{" "}
                    <span className="text-warning">
                      <TiStarFullOutline />
                    </span>
                  </div>
                  <div className="rating-slide-track flex-grow-1 me-2">
                    <div
                      className="rating-slide-fill"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="rating-slide-percent">{percent}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  {isLoggedIn && !isReviewGiven && (
  <section className="rating-section">
    <div className="container review-form-container">
      <h2 className="review-form-heading">Why Did You Leave This Rating?</h2>
      <p className="review-form-subheading">Amazing, Above Expectation</p>

      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((num) => (
          <TiStarFullOutline
            key={num}
            className={`review-star ${num <= rate ? "active" : ""}`}
            onClick={() => setRate(num)}
          />
        ))}
      </div>

      <textarea
        placeholder="Write your review here..."
        className="review-textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button className="submit-review-btn" onClick={handleSubmitReview}>
        Submit Review
      </button>
    </div>
  </section>
)}


      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-filter-box">
            <button
              onClick={showAllReviews}
              className={activeFilter === "all" ? "active" : ""}
            >
              All Reviews
            </button>
            <button
              onClick={sortByRecent}
              className={activeFilter === "recent" ? "active" : ""}
            >
              Most Recents
            </button>
            <button
              onClick={sortByRating}
              className={activeFilter === "rating" ? "active" : ""}
            >
              Highest Rated
            </button>
          </div>

          <div className="row">
            <div className="col-12 testimonial-main-col">
              {filteredReviews.map((item, i) => (
                <div key={i} className="testimonial-main-box">
                  <div className="testimonial-img-box">
                    <img
                      src={item.candidate_image || "/images/dummy-img.png"}
                      alt="profile"
                      className="view-clinic__profile-img view_rating_profile_img"
                    />
                  </div>
                  <div className="testimonial-info-box">
                    <div className="testimonial-info-top">
                      <h2>{item.candidate_name || "User"}</h2>
                      <button>{getTimeAgo(item.created)}</button>
                    </div>
                    <h5>{item.profession}</h5>
                    <div className="view-clinic__stars">
                      {renderStars(item.rate)}
                    </div>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default Reviews;
