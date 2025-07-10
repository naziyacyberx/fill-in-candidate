import React, { useEffect, useState } from "react";
import "../styles/viewclinic.css";
import Navbar from "../sections/common/Navbar";
import Footer from "../sections/common/Footer";
import { TiStarFullOutline } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";
import { viewClinicApi } from "../apis/ViewClinicApi";
import { Link, useParams } from "react-router-dom";
import { TiStarOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";

const ViewClinic = () => {
  const { id } = useParams();
  const [clinicDetails, setClinicDetails] = useState(null);

  console.log(clinicDetails, "clinicDetails");

  useEffect(() => {
    const fetchClinicDetails = async () => {
      const response = await viewClinicApi(id);
      const clinicDetails = response?.data?.data;
      console.log("clinic details response", clinicDetails);
      setClinicDetails(clinicDetails);
    };
    fetchClinicDetails();
  }, [id]);

  if (!clinicDetails) return <p>Loading...</p>;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const totalStars = 5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<TiStarFullOutline key={`full-${i}`} />);
    }

    if (halfStar) {
      stars.push(<TiStarHalfOutline key="half" />);
    }

    const remaining = totalStars - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<TiStarOutline key={`empty-${i}`} />);
    }

    return stars;
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className="view-clinic-section">
        <div className="container view-clinic">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="view-clinic__profile">
                <img
                  src={clinicDetails?.profile ||  "/images/dummy-img.png"}
                  alt="profile"
                  className="view-clinic__profile-img"
                />
                <div className="view-clinic__profile-info">
                  <h5>{clinicDetails?.name}</h5>
                  <p>{clinicDetails?.practice_name}</p>
                  <div className="view-clinic__stars">
                    {renderStars(clinicDetails?.rating)}
                    <span>
                      {clinicDetails?.rating?.toFixed(1)}{" "}
                      <Link className="review-heading" to={`/reviews/${id}`}>
                        ({clinicDetails?.review_count} Reviews)
                      </Link>
                    </span>
                  </div>

                  <a href="#">Add a Review</a>
                  <div className="view-clinic__badge">
                    From {clinicDetails?.established_year}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="view-clinic__contact">
                <h6>Contact Information</h6>
                <div className="row">
                  <div className="col-6 view-clinic__contact-item">
                    <img
                      className="img-fluid add-icon"
                      src="/images/users.png"
                      alt="icon"
                    />
                    {clinicDetails?.name}
                  </div>
                  <div className="col-6 view-clinic__contact-item">
                    <img
                      className="img-fluid add-icon"
                      src="/images/available.png"
                      alt="icon"
                    />{" "}
                    {clinicDetails?.practice_name}
                  </div>
                  <div className="col-6 view-clinic__contact-item">
                    <img
                      className="img-fluid add-icon"
                      src="/images/envelop.png"
                      alt="icon"
                    />{" "}
                    {clinicDetails?.email}
                  </div>
                  <div className="col-6 view-clinic__contact-item">
                    <img
                      className="img-fluid add-icon"
                      src="/images/phone.png"
                      alt="icon"
                    />{" "}
                    {clinicDetails?.phone || "no data found"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="view-clinic__section">
            <h6>Practice Location</h6>
            <p className="view-clinic__location">
              <img
                className="img-fluid add-icon"
                src="/images/add-icon.png"
                alt="icon"
              />{" "}
              {clinicDetails?.address} {clinicDetails?.postcode}
            </p>
          </div>

          <div className="view-clinic__section">
            <h6>Types of Dentistry Practiced</h6>
            <div className="view-clinic__tags">
              {clinicDetails?.dentistry.map((items, i) => (
                <span key={i}>
                  <FaCheck /> {items}
                </span>
              ))}
            </div>
            <div className="view-clinic__line-option">
              <span>Team Size</span>
              <span>
                <img
                  className="img-fluid"
                  src="/images/check.png"
                  alt="check-icon"
                />{" "}
                {clinicDetails?.practice_size}
              </span>
            </div>
          </div>

          <div className="view-clinic__section">
            <h6>Staffing Requirements</h6>
            <div className="view-clinic__tags">
              {clinicDetails?.looking.map((items, i) => (
                <span key={i}>
                  {" "}
                  <FaCheck /> {items}
                </span>
              ))}
            </div>
          </div>

          <div className="view-clinic__section">
            <h6>Primarily Looking For</h6>
            <div className="view-clinic__radio">
              {" "}
              <img
                className="img-fluid"
                src="/images/check.png"
                alt="check-icon"
              />{" "}
              {clinicDetails?.primarly_looking}
            </div>
          </div>

          <div className="view-clinic__section">
            <h6>Typical Working Hours</h6>
            <div className="view-clinic__tags">
              {clinicDetails?.working_hours.map((items, i) => (
                <span key={i}>
                  {" "}
                  <FaCheck /> {items}
                </span>
              ))}
            </div>
          </div>

          <div className="view-clinic__section">
            <h6>Software Needs</h6>
            <div className="view-clinic__tags">
              {clinicDetails?.use_software.map((items, i) => (
                <span key={i}>
                  <FaCheck /> {items}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default ViewClinic;
