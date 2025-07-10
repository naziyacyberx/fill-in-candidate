// import React, { useState, useEffect } from "react";
// import { Card, Form, Button, ProgressBar, Image } from "react-bootstrap";
// import { FaStar, FaUpload } from "react-icons/fa";
// import { useLocation } from "react-router-dom";

// const RatingsAndReviews = () => {
//   const location = useLocation();
//   const candidateId = location.state?.id || "63"; // fallback if not passed
//   const [candidate, setCandidate] = useState(null);
//   const [rating, setRating] = useState(5);
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);

//   // Fetch Candidate Details
//   useEffect(() => {
//     const fetchCandidate = async () => {
//       try {
//         const res = await fetch(`https://fillin-admin.cyberxinfosolution.com/api/recruiter/view-applicants/${candidateId}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`,
//           },
//         });
//         const data = await res.json();
//         setCandidate(data.data);
//       } catch (error) {
//         console.error("Error fetching candidate info:", error);
//       }
//     };
//     if (candidateId) fetchCandidate();
//   }, [candidateId]);

//   // Convert image to base64
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => setImage(reader.result.split(",")[1]);
//     if (file) reader.readAsDataURL(file);
//   };

//   const renderStars = (currentRating, setRatingFn) =>
//     Array.from({ length: 5 }).map((_, i) => (
//       <FaStar
//         key={i}
//         className={`me-1 ${i < currentRating ? "text-warning" : "text-muted"}`}
//         onClick={() => setRatingFn(i + 1)}
//         style={{ cursor: "pointer" }}
//       />
//     ));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       rate: rating,
//       candidate_id: candidateId,
//       comment: description,
//       image: image || "",
//     };

//     try {
//       const res = await fetch("https://fillin-admin.cyberxinfosolution.com/api/recruiter/add-review", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       alert("Review submitted successfully!");
//     } catch (error) {
//       console.error("Failed to submit review:", error);
//       alert("Error submitting review.");
//     }
//   };

//   const ratingDistribution = { 5: 70, 4: 50, 3: 25, 2: 10, 1: 5 };

//   return (
//     <div className="container py-4" style={{ maxWidth: "900px" }}>
//       <h5><strong>Ratings & Reviews</strong></h5>

//       <Card className="p-3 mt-3 shadow-sm">
//         <div className="d-flex align-items-center">
//           <Image
//             src={candidate?.profile || "https://via.placeholder.com/60"}
//             roundedCircle
//             width={60}
//             height={60}
//             className="me-3"
//           />
//           <div>
//             <h6 className="mb-0">{candidate?.name || "N/A"}</h6>
//             <div className="text-muted small">{candidate?.title || "No title"}</div>
//             <div className="text-warning">{renderStars(candidate?.rating, () => {})}</div>
//             {/* <span className="text-muted small">No Reviews Yet</span> */}
//           </div>
//         </div>

//         <div className="mt-4 d-flex gap-5">
//           <div className="text-center">
//             <h2 className="mb-0">{candidate?.rating}</h2>
//             <small className="text-muted">({candidate?.reviews?.length} Reviews)</small>
//           </div>

//           <div className="flex-grow-1">
//             {Object.entries(ratingDistribution).reverse().map(([stars, percent]) => (
//               <div key={stars} className="d-flex align-items-center mb-2">
//                 <div className="me-2" style={{ width: "20px" }}>{stars}</div>
//                 <ProgressBar now={percent} style={{ flex: 1, height: "8px" }} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </Card>

//       {/* Leave a Rating Section */}
//       <Card className="p-4 mt-4 shadow-sm">
//         <h6><strong>Why Did You Leave This Rating?</strong></h6>
//         <div className="mb-3 mt-2">{renderStars(rating, setRating)}</div>

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Control
//               as="textarea"
//               rows={4}
//               placeholder="Leave your comments here..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId="formFile" className="mb-3">
//             <Form.Label className="d-flex align-items-center gap-2">
//               <FaUpload /> Upload Image
//             </Form.Label>
//             <Form.Control type="file" onChange={handleImageUpload} />
//           </Form.Group>

//           {image && (
//             <div className="mb-3">
//               <Image src={`data:image/jpeg;base64,${image}`} height="80" rounded />
//             </div>
//           )}

//           <Button variant="primary" type="submit">
//             Submit Review
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default RatingsAndReviews;

import React, { useState, useEffect } from "react";
import { Card, Form, Button, ProgressBar, Image } from "react-bootstrap";
import { FaStar, FaUpload } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const RatingsAndReviews = () => {
  const location = useLocation();
  const candidateId = location.state?.id || "63"; // fallback

  const [candidate, setCandidate] = useState(null);
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await fetch(
          `https://fillin-admin.cyberxinfosolution.com/api/recruiter/view-applicants/${candidateId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`,
            },
          }
        );
        const data = await res.json();
        setCandidate(data.data);
      } catch (error) {
        console.error("Error fetching candidate info:", error);
      }
    };

    if (candidateId) fetchCandidate();
  }, [candidateId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result.split(",")[1]); // Extract base64
    };

    if (file) reader.readAsDataURL(file);
  };

  const renderStars = (currentRating, setRatingFn) =>
    Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        className={`me-1 ${i < currentRating ? "text-warning" : "text-muted"}`}
        onClick={() => setRatingFn?.(i + 1)}
        style={{ cursor: setRatingFn ? "pointer" : "default" }}
      />
    ));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      rate: rating,
      candidate_id: candidateId,
      comment: description,
      image: image || "",
    };

    try {
      const res = await fetch(
        "https://fillin-admin.cyberxinfosolution.com/api/recruiter/add-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Error submitting review.");
    }
  };

  const ratingDistribution = { 5: 70, 4: 50, 3: 25, 2: 10, 1: 5 };

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h5><strong>Ratings & Reviews</strong></h5>

      {/* Candidate Info */}
      <Card className="p-3 mt-3 shadow-sm">
        <div className="d-flex align-items-center">
          <Image
            src={candidate?.profile || "https://via.placeholder.com/60"}
            roundedCircle
            width={60}
            height={60}
            className="me-3"
          />
          <div>
            <h6 className="mb-0">{candidate?.name || "N/A"}</h6>
            <div className="text-muted small">{candidate?.title || "No title"}</div>
            <div className="text-warning">{renderStars(4)}</div>
            <span className="text-muted small">
              {candidate?.reviews?.length || 0} Reviews
            </span>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="mt-4 d-flex gap-5">
          <div className="text-center">
            <h2 className="mb-0">4.5</h2>
            <small className="text-muted">(128 Reviews)</small>
          </div>

          <div className="flex-grow-1">
            {Object.entries(ratingDistribution)
              .reverse()
              .map(([stars, percent]) => (
                <div key={stars} className="d-flex align-items-center mb-2">
                  <div className="me-2" style={{ width: "20px" }}>{stars}</div>
                  <ProgressBar now={percent} style={{ flex: 1, height: "8px" }} />
                </div>
              ))}
          </div>
        </div>
      </Card>

      {/* Leave a Rating */}
      <Card className="p-4 mt-4 shadow-sm">
        <h6><strong>Why Did You Leave This Rating?</strong></h6>
        <div className="mb-3 mt-2">{renderStars(rating, setRating)}</div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Leave your comments here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="d-flex align-items-center gap-2">
              <FaUpload /> Upload Image
            </Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
          </Form.Group>

          {image && (
            <div className="mb-3">
              <Image
                src={`data:image/jpeg;base64,${image}`}
                height="80"
                rounded
              />
            </div>
          )}

          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </Form>
      </Card>

      {/* Filter Buttons */}
      <div className="d-flex flex-wrap gap-2 mt-4">
        {["All Reviews", "Most Recent", "Highest Rated", "Less Rated"].map((label, idx) => (
          <Button key={idx} variant="outline-primary" className="rounded-pill px-3 py-1">
            {label}
          </Button>
        ))}
      </div>

      {/* Review List */}
      {candidate?.reviews?.length > 0 ? (
        candidate.reviews.map((review, index) => (
          <Card className="p-3 mt-3 shadow-sm" key={index}>
            <div className="d-flex align-items-start">
              <Image
                src={review.recruiter?.profile || "https://via.placeholder.com/50"}
                roundedCircle
                width={50}
                height={50}
                className="me-3"
              />
              <div>
                <h6 className="mb-0">{review?.clinic_name || "Anonymous Recruiter"}</h6>
                <div className="text-muted small mb-1">
                  {renderStars(review.rate)} • {review.created_at?.slice(0, 10)}
                </div>
                <p className="mb-1">{review.recruiter_name}</p>
                <p className="mb-1">{review.comment}</p>
                {review.image && (
                  <Image
                    src={`${Clinic_profile}`}
                    height={80}
                    rounded
                  />
                )}
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-muted mt-3">No reviews yet.</p>
      )}
    </div>
  );
};

export default RatingsAndReviews;
