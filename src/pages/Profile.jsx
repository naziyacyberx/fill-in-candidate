import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import {
  FaUser,
  FaStar,
  FaBookmark,
  FaCalendarAlt,
  FaInfoCircle,
  FaShieldAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../sections/common/Navbar";
import Footer from "../sections/common/Footer";
import { SuccessToaster } from "../utils/Toaster";
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const token = localStorage.getItem("fillInToken");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const res = await axios.get(
          "https://fill-in.cyberxinfosolution.com/api/candidate/candidate-profile",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.status === "success") {
          setProfileImage(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load profile image:", err);
      } finally {
        setLoadingImage(false);
      }
    };

    fetchProfileImage();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("fillInToken");
    setShowLogoutModal(false);
    SuccessToaster("Logout Successfully");
    navigate("/candidate/login");
  };

  return (
    <>
      {/* <Navbar /> */}
      <Container className="mt-5 mb-5 text-center">
        <Row className="justify-content-center">
          <Col md={9}>
            {loadingImage ? (
              <Spinner animation="border" />
            ) : (
              <Image
                src={profileImage || "/images/users.png"}
                roundedCircle
                width={100}
                height={100}
                className="border border-primary mb-3"
              />
            )}
            <h5 className="fw-bold mb-4">Complete Profile</h5>

            <ListGroup className="custom-list-group">
              {[
                { icon: <FaUser />, label: "My Profile", route: "/my-profile" },
                {
                  icon: <FaStar />,
                  label: "My Rating & Reviews",
                  route: "/my-ratings-reviews",
                },
                {
                  icon: <FaBookmark />,
                  label: "Saved Jobs",
                  route: "/saved-jobs",
                },
                {
                  icon: <FaCalendarAlt />,
                  label: "Scheduled Interviews",
                  route: "/schedule-interview",
                },
                {
                  icon: <FaInfoCircle />,
                  label: "About Us",
                  route: "/about-us",
                },
                {
                  icon: <FaShieldAlt />,
                  label: "Privacy Policy",
                  route: "/privacy-policy",
                },
                {
                  icon: <FaSignOutAlt />,
                  label: "Log Out",
                  route: "#",
                  logout: true,
                },
              ].map((item, idx) => (
                <ListGroup.Item
                  key={idx}
                  action
                  className={`d-flex align-items-center border justify-content-between px-3 py-3 shadow-sm rounded mb-3 ${
                    item.logout ? "text-danger" : "text-dark"
                  }`}
                  onClick={() =>
                    item.logout
                      ? setShowLogoutModal(true)
                      : navigate(item.route)
                  }
                >
                  <span className="d-flex align-items-center">
                    <span className="icon-circle me-3">{item.icon}</span>
                    {item.label}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}

      {/* Logout Confirmation Modal */}
      <Modal
        show={showLogoutModal} 
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Body className="text-center py-5">
          <div className="mb-3">
            <div className="border m-auto p-3   rounded-circle d-flex justify-content-center align-item-center mb-3" style={{width:"70px", height:"70px", backgroundColor:"#F2F7FF" }  }>

            <FaSignOutAlt size={40} className="text-primary mb-2" />
            </div>
            <h5 className="fw-bold">Logout</h5>
            <p className="text-muted">Are you sure you want to logout?</p>
          </div>
          <Button variant="primary" onClick={handleLogout} className="w-100">
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
