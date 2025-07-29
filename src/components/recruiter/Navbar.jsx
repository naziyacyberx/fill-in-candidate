import { useEffect, useState, useRef } from "react";
import "../../styles/navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaEnvelope, FaUserCircle } from "react-icons/fa";
// import NavbarSideBar from "./NavbarSideBar";
import { FiMessageSquare } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import NotificationPopup from "../../components/Notificationpopup";
import axios from "axios";
import NavbarSideBar from "../../sections/common/NavbarSideBar";
import { baseUrl } from "../../utils/BaseUrl";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const currentPath = location.pathname + location.search;

const [showNotifications, setShowNotifications] = useState(false);
const [notifications, setNotifications] = useState([]);
const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("recruiterToken"); // token from localStorage
    const response = await axios.get(
      `${baseUrl}recruiter/notification-list`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res", response);
    

    if (response?.data?.status === "success") {
      setNotifications(response.data.data);
    }
  } catch (error) {
    console.error("Error fetching notifications", error);
  }
};



  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem("recruiterToken");
    setIsLoggedIn(!!token);
    fetchNotifications()
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("recruiterToken");
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate("/recruiter/login");
  };

  return (
    <>
      <NavbarSideBar show={show} setShow={setShow} />

      {/* Desktop Navbar */}
      <section className="nav-main py-4 d-lg-block d-none">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-3">
              <img
                onClick={() => navigate("/")}
                className="img-fluid logo"
                src="/images/logo.png"
                alt="Logo"
              />
            </div>
            <div className="col-9 text-end position-relative">
              <div className="btn-nav">
             {isLoggedIn ? (
<div className="position-relative d-inline-flex align-items-center gap-3" ref={menuRef}>
  <FiMessageSquare
    size={28}
    className="message-icon"
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/recruiter/messages")}
  />

  <div className="position-relative">
    <FaBell
      size={20}
      className="notification-icon"
      style={{ cursor: "pointer" }}
      onClick={() => {
        setShowNotifications((prev) => !prev);
        if (!showNotifications) fetchNotifications(); // Only fetch when opening
      }}
    />
    {notifications.length > 0 && !showNotifications && (
      <span
        className="notification-badge"
      >
        {notifications.length}
      </span>
    )}
  </div>

  {showNotifications && (
    <NotificationPopup
      notifications={notifications}
      onClose={() => setShowNotifications(false)}
    />
  )}

  <FaUserCircle
    size={28}
    className="user-icon"
    style={{ cursor: "pointer" }}
    onClick={() => setShowMenu((prev) => !prev)}
  />

  {showMenu && (
    <div className="user-menu-popup text-center">
      <ul>
        <li onClick={() => navigate("/recruiter/scheduled-interviews")}>Scheduled Interviews</li>
        <li onClick={() => navigate("/recruiter/create-job")}>Create Job</li>
        <li onClick={() => navigate("/recruiter/profile")}>Profile</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  )}
</div>

) : (
  <>
    <button
      onClick={() =>
        navigate("/recruiter/login", { state: { from: currentPath } })
      }
      className="btn-login"  
    >
      Log In
    </button>
    <button
      onClick={() => navigate("/recruiter/register")}
      className="btn-register"
    >
      Register
    </button>
  </>
)}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Navbar */}
      <section className="nav-main py-2 d-lg-none d-block">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <img
                onClick={() => navigate("/candidate/")}
                className="img-fluid"
                src="/images/logo.png"
                alt="Logo"
              />
            </div>
            <div className="col-7 nav-col">
              <FaBars onClick={() => setShow(true)} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Navbar;
