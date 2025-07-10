import React, { useEffect, useState } from "react";
import Navbar from "../sections/common/Navbar";
import Banner from "../sections/home/Banner";
import Card from "../sections/home/Card";
import Hiring from "../sections/home/Hiring";
import Job from "../sections/home/Job";
import Stripe from "../sections/home/Stripe";
import Recent from "../sections/home/Recent";
import Footer from "../sections/common/Footer";
import { homeApi } from "../../src/apis/HomeApi";

const Home = () => {
  const [cardData, setCardData] = useState();
  const [jobData, setJobData] = useState();

  const fetchJobData = async () => {
    const response = await homeApi();
    
    const cardItems = response?.data?.data?.specialization;
    const jobItems = response?.data?.data?.jobs;
    setCardData(cardItems);
    setJobData(jobItems);
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  

  return (
    <>
      {/* <Navbar /> */}
      <Banner />
      <Card cardData={cardData || []} />

      {jobData?.length > 0 && <Job jobData={jobData} refreshJobs={fetchJobData} />}

      <Stripe />

      {/* <Footer /> */}
    </>
  );
};

export default Home;
