import { useEffect, useState } from "react";
import "../../styles/jobdetail.css";
import { FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

import { FaMoneyBills } from "react-icons/fa6";
// import { jobDetailsApi } from "../../apis/JobDetailApi";
import { Link, useParams } from "react-router-dom";
import ReportPopup from "../../components/ReportPopup";
import { FaAngleRight } from "react-icons/fa";
import { applyJobApi } from "../../apis/ApplyJobApi";
import { jobDetailsApi, RecruiterjobDetailsApi } from "../../apis/JobDetailApi";

const JobDetails = () => {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);
  console.log(jobDetail, "jobDetail");

  const fetchJobDetails = async () => {
    const response = await RecruiterjobDetailsApi(id);
    const jobDetails = response?.data?.data;
    console.log("Job Detail Response", jobDetails);
    setJobDetail(jobDetails);
  };
  useEffect(() => {
    fetchJobDetails();
  }, [id]); //if id changes, fetch the job details again

  if (!jobDetail) return <p>Loading...</p>;

  return (
    <>
      {/* <Navbar /> */}

      { jobDetail==[] ?
      <div>
        Job is not available
      </div>

      :<div>
  <section className="job-detail-main-section">
        <section className="job-details-top-section">
          <div className="container my-4">
            <div className="job-detail-top-box">
              <div className="row align-items-center">
                <div className="col-4 col-md-4">
                  <img
                    src={jobDetail?.clinic_logo || "/images/dummy-img.png"}
                    alt="Clinic"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-8 col-md-8 job-detail-box-main">
                  <div className="job-shift-main">
                    {/* {jobDetail?.shift?.map((items, i) => (
                      <h6 key={i}>{items}</h6>
                    ))} */}
                  </div>

                  <h3>{jobDetail?.title}</h3>
                  <p className="text-primary ">{jobDetail?.clinic}</p>

                  <div className="detail-location">
                    <div className="d-flex align-items-center text-muted small ">
                      <FaMapMarkerAlt className="me-1" />
                      <p> {jobDetail?.address}</p>
                    </div>
                    <div className="d-flex align-items-center money-btn">
                      <FaMoneyBills className="me-2 money-icon" />
                      <p>
                        {" "}
                        $ {jobDetail?.salary_range_from} - ${" "}
                        {jobDetail?.salary_range_to}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="job-details-card-section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="job-details-card-main">
                  <div className="job-details-card-img">
                    <img
                      className="img-fluid"
                      src="/images/experience.png"
                      alt="check-icon"
                    />
                  </div>
                  <div className="job-details-card-content">
                    <h6>Experience</h6>
                    <h4>4 Years</h4>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="job-details-card-main">
                  <div className="job-details-card-img">
                    <img
                      className="img-fluid"
                      src="/images/Vacancy.png"
                      alt="check-icon"
                    />
                  </div>
                  <div className="job-details-card-content">
                    <h6>Vacancy</h6>
                    <h4>{jobDetail?.vacancy}</h4>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="job-details-card-main">
                  <div className="job-details-card-img">
                    <img
                      className="img-fluid"
                      src="/images/Applied.png"
                      alt="check-icon"
                    />
                  </div>
                  <div className="job-details-card-content">
                    <h6>Apply</h6>
                    <h4>{jobDetail?.candidates_count}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="job-description-section">
          <div className="container">
            <div className="job-desc-main">
              <h4>Job Description</h4>
              <p className="job-desc-para">{jobDetail?.job_description}</p>
            </div>
          </div>
        </section>

        <section className="job-description-section">
          <div className="container">
            <div className="job-desc-main role-desc-main">
              <h4>Benefits and Perks</h4>
              <div className="row">
                <div className="benefits-box">
                  {jobDetail?.benefits?.map((item, i) => (
                    <div key={i} className="role-main">
                      <img
                        className="img-fluid"
                        src="/images/check.png"
                        alt="check-icon" 
                      />

                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="job-description-section">
          <div className="container">
            <div className="job-desc-main role-desc-main">
              <h4>About Clinic</h4>
              <div className="about-clinic-main">
                <div className="about-clinic-top">
                  <div className="about-clinic-top-img">
                    <img
                      className="img-fluid"
                      src={jobDetail?.clinic_logo || "/images/dummy-img.png"}
                      alt="clinic-img"
                    />
                  </div>
                  <div className="about-clinic-top-content">
                    <h2>{jobDetail?.clinic}</h2>
                    <p>
                      {jobDetail?.clinic_description || "no data found"}{" "}
                      <Link
                        className="read-clinic-detail-btn"
                        to={`/view-clinic/${id}`}
                      >
                        Read More <FaAngleRight />
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="about-clinic-bottom">
                  <div className="role-main solo-main">
                    <div className="solo-img-box">
                      <img
                        className="img-fluid solo-img"
                        src="/images/Solo.png"
                        alt="check-icon"
                      />
                    </div>

                    <p>{jobDetail?.practice_size || "no data found"}</p>
                  </div>

                  <div className="role-main solo-main">
                    <div className="solo-img-box">
                      <img
                        className="img-fluid solo-img"
                        src="/images/Website.png"
                        alt="check-icon"
                      />
                    </div>

                    <p>{jobDetail?.web_link || "no data found"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="job-detail-apply-btns-section">
          <div className="container">
            <div className="job-detail-apply-btns-main">
            <button
  disabled={jobDetail.applied}
  className={`apply-btn-detail ${jobDetail.applied ? "disabled-btn" : ""}`}
  onClick={async () => {
    try {
      const response = await applyJobApi(id);
        await fetchJobDetails(); // ensure updated state
        toast.success("Job applied successfully!");
    } catch (err) {
      toast.error("Failed to apply for the job.");
    }
  }}
>
  {jobDetail.applied ? "Applied" : "Apply"}
</button>


              {/* <button className="apply-btn-detail">Applied</button> */}
              <button
                className="report-btn-details"
                onClick={() => setShowReportPopup(true)}
              >
                Report this job
              </button>
            </div>
          </div>
        </section>
      </section>
      {/* <Footer /> */}
      {showReportPopup && (
        <ReportPopup onClose={() => setShowReportPopup(false)}  job_id={id}/>
      )}
      </div>  


      }
    
    </>
  );
};

export default JobDetails;
