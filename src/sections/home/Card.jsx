import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/cardbox.css";
import axios from "axios";

const professionMap = {
  "Dentist": 1,
  "Dental Assistant": 2,
  "Receptionist": 3,
  "Hygienist": 4,
  "Oral Health Therapist": 5,
};

const Card = ({ cardData }) => {
  const navigate = useNavigate();

  const handleCardClick = async (professionName) => {
    const professionId = professionMap[professionName];
    if (!professionId) {
      console.warn("Unknown profession:", professionName);
      return;
    }

    try {
      const response = await axios.get(
        `https://fillin-admin.cyberxinfosolution.com/api/dashboard?search=${professionName}`,
        {
          profession: [professionId],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const jobs = response?.data?.data?.jobs || [];

      navigate("/candidate/jobs", {
        state: {
          jobs,
        },
      });
    } catch (error) {
      console.error("Failed to fetch jobs for profession:", professionName, error);
    }
  };

  return (
    <section className="card-box">
      <div className="container">
        <p className="card-title-section mb-5">Jobs Category</p>

        <div className="row">
          {Array.isArray(cardData) &&
            cardData.map((card, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-6 col-lg-4 d-flex"
                onClick={() => handleCardClick(card.name)}
                style={{ cursor: "pointer" }}
              >
                <div className="profile-card">
                  <div className="job-category-img-box">
                    <img
                      src="/images/tooth.png"
                      alt={card.name}
                      className="icon-img img-fluid"
                    />
                  </div>
                  <div className="job-card-content">
                    <h6 className="applican-name">{card.name}</h6>
                    <p className="text-primary mb-0">{card.job_count} Jobs

                      {card.job_count} {card.job_count > 0 ? "Jobs" : "Job"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Card;
