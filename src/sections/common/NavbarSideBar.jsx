
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import "../../styles/sidebar.css";



function NavbarSideBar({ show, setShow }) {
  const navigate = useNavigate();
  return (
    <>
      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {" "}
            <img
              className="img-fluid"
              src="images\real-state-logo.png"
              alt="Logo"
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="px-3 sidebar-navbar">
            <ul className="sidebar-navbar-nav flex-column">
              <li
                className="sidebar-nav-item"
                onClick={() => {
                  navigate("/");
                  setShow(false);
                }}
              >
                <p
                  className="sidebar-nav-link d-flex align-items-center"
                  style={{
                    marginRight: "7px",
                    cursor: "pointer",
                  }}
                >
                  Home
                </p>
              </li>
              <li
                className="sidebar-nav-item"
                onClick={() => {
                  navigate("/about-us");
                  setShow(false);
                }}
              >
                <p
                  className="sidebar-nav-link d-flex align-items-center"
                  style={{
                    marginRight: "7px",
                    cursor: "pointer",
                  }}
                >
                  About Us
                </p>
              </li>
              <li
                className="sidebar-nav-item"
                onClick={() => {
                  navigate("/property-listing");
                  setShow(false);
                }}
              >
                <p
                  className="sidebar-nav-link d-flex align-items-center"
                  style={{
                    marginRight: "7px",
                    cursor: "pointer",
                  }}
                >
                  Property
                </p>
              </li>
              <li
                className="sidebar-nav-item"
                onClick={() => {
                  navigate("/blogs");
                  setShow(false);
                }}
              >
                <p
                  className="sidebar-nav-link d-flex align-items-center"
                  style={{
                    marginRight: "7px",
                    cursor: "pointer",
                  }}
                >
                  Blogs
                </p>
              </li>
              <li
                className="sidebar-nav-item"
                onClick={() => {
                  navigate("/contact-us");
                  setShow(false);
                }}
              >
                <p
                  className="sidebar-nav-link d-flex align-items-center"
                  style={{
                    marginRight: "7px",
                    cursor: "pointer",
                  }}
                >
                  Contact Us
                </p>
              </li>
      
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarSideBar;
