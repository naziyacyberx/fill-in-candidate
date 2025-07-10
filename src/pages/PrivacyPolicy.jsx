import { useEffect, useState } from "react";
import { settingApi } from "../apis/SettingApi";
import "../styles/privacypolicy.css";
import Navbar from "../sections/common/Navbar";
import Footer from "../sections/common/Footer";

const PrivacyPolicy = () => {
  const [privacyData, setPrivacyData] = useState("");

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await settingApi();
        setPrivacyData(response?.data?.data?.privacy_policy || "No Data Found");
      } catch (error) {
        console.error("Error fetching Privacy Policy:", error);
        setPrivacyData("Error loading privacy policy");
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <section className="privacy-banner">
        <h1>Privacy Policy</h1>
      </section>

      <section className="privacy-content-section">
        <div className="container py-5">
          <div dangerouslySetInnerHTML={{ __html: privacyData }} />
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default PrivacyPolicy;
