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

const CandidatesCategories = ({ cardData }) => {
  const navigate = useNavigate();
  console.log("cardData", cardData);
  

 const handleCardClick = async (professionId) => {
  try {
    const response = await axios.get(
      "https://fillin-admin.cyberxinfosolution.com/api/dashboard",
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

    const candidates = response?.data?.data?.candidate || [];

    navigate("/recruiter/job-category", {
      state: {
        candidates,
      },
    });
  } catch (error) {
    console.error("Failed to fetch jobs for profession:", professionId, error);
  }
};


  return (
    <section className="card-box ">
      <div className="container">
        <p className="card-title-section mb-5">Candidates Category</p>

        <div className="row">
          {Array.isArray(cardData) &&
            cardData.map((card, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-6 col-lg-4 d- cursor-pointer"
          onClick={() => handleCardClick(professionMap[card.name])}

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
                    <p className="text-primary mb-0">{card.candidate_count} {card.candidate_count > 0 ? "Candidates" : "Candidate"}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CandidatesCategories;
