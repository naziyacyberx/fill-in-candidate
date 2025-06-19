import React from "react";
import "../../styles/cardbox.css";

const Card = ({ cardData }) => {
  return (
    <>
      <section className="card-box">
        <div className="container">
          <p className="card-title-section mb-5">Jobs Category</p>

          <div className="row">
            {cardData &&
              cardData.map((card, index) => (
                <div key={index} className="col-sm-6 col-md-6 col-lg-4 d-flex">
                  <div className="profile-card">
                 <div className="job-category-img-box" >
                     <img
                      src="/images/tooth.png"
                      alt={card.name}
                      className="icon-img img-fluid"
                    />
                 </div>
                    <div className="job-card-content">
                      <h6 className="applican-name">{card.name}</h6>
                      <p className="text-primary mb-0">
                        {card.job_count} Jobs
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;
