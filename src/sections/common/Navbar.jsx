import { useEffect, useState, useRef } from "react";
import "../../styles/navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaEnvelope, FaUserCircle } from "react-icons/fa";
import NavbarSideBar from "./NavbarSideBar";
import { FiMessageSquare } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const currentPath = location.pathname + location.search;

  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem("fillInToken");
    setIsLoggedIn(!!token);
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
    localStorage.removeItem("fillInToken");
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate("/");
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
    {/* <FaEnvelope
      size={22}
      className="message-icon"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/messages")}
    /> */}
    <FiMessageSquare
  size={28}
  className="message-icon"
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/messages")}
/>

    <FaUserCircle
      size={28}
      className="user-icon"
      style={{ cursor: "pointer" }}
      onClick={() => setShowMenu((prev) => !prev)}
    />
    {showMenu && (
      <div className="user-menu-popup text-center">
        <ul>
          <li onClick={() => navigate("/applies")}>Applied Jobs</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    )}
  </div>
) : (
  <>
    <button
      onClick={() =>
        navigate("/login", { state: { from: currentPath } })
      }
      className="btn-login"
    >
      Log In
    </button>
    <button
      onClick={() => navigate("/register")}
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
                onClick={() => navigate("/")}
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
};

export default Navbar;
