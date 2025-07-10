import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';
import Navbar from '../sections/common/Navbar';
import Footer from '../sections/common/Footer';

const AboutUs = () => {
  const [aboutHtml, setAboutHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("fillInToken");

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get(
          'https://fill-in.cyberxinfosolution.com/api/recruiter/setting',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.status === 'success') {
          setAboutHtml(response.data.data.about_us);
        } else {
          console.error("Failed to load About Us:", response?.data?.message);
        }
      } catch (error) {
        console.error("API Error:", error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, [token]);

  return (
    <>
      {/* <Navbar /> */}
          <section className="privacy-banner">
        {/* <h2 className="mb-4 fw-bold">About Us</h2> */}
        <h1>About Us</h1>
      </section>
      <Container className="py-5">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <div
            className="about-us-content"
            dangerouslySetInnerHTML={{ __html: aboutHtml }}
          />
        )}
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default AboutUs;
