
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import "../../styles/sidebar.css";



function NavbarSideBar({ show, setShow, isLoggedIn,setIsLoggedIn }) {
  
  const handleLogout = () => {
    localStorage.removeItem("fillInToken");
    setIsLoggedIn(false);
    setShow(false);
    navigate("/candidate/login");
  };

  const navigate = useNavigate();
  return (
    <>
      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {" "}
            <img
            width="100px"
              className="img-fluid"
              src="/images/logo.png"
              alt="Logo"
            />
          </Offcanvas.Title>   
        </Offcanvas.Header>       
        <Offcanvas.Body>   
          <div className="px-3 sidebar-navbar">   
            <ul className="sidebar-navbar-nav flex-column">
                                                                                      
             {isLoggedIn?
       
              <>
              <li
                className="sidebar-nav-item"
                onClick={() => {
                  navigate("/candidate/applies");
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
               Applications
                </p>
              </li>
              <li
                className="sidebar-nav-item"
               onClick={() =>{ navigate("/candidate/profile");
                     setShow(false);}
               }
                >
                <p
                  className="sidebar-nav-link d-flex align-items-center"
                  style={{
                    marginRight: "7px",
                    cursor: "pointer",
                  }}
                  >
             My Account
                </p>
              </li>
           
              <li
                className="sidebar-nav-item"
       
                  onClick={handleLogout}
                >
                <p
                  className="sidebar-nav-link d-flex align-items-center"
                  style={{
                    marginRight: "7px",
                    cursor: "pointer",
                  }}
                  >
              Logout
                </p>

              </li>
                
              
{/* 
                      <li onClick={() => navigate("/recruiter/scheduled-interviews")}>Scheduled Interviews</li>
        <li onClick={() => navigate("/recruiter/create-job")}>Create Job</li>
        <li onClick={() => navigate("/recruiter/profile")}>Profile</li>
        <li onClick={handleLogout}>Logout</li> */}
                  </>

              :
                    <>
             <li
                className="sidebar-nav-item"
                onClick={() => {
                  navigate("/candidate/login");
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
               Login
                </p>
              </li>
              <li
    
                className="sidebar-nav-item"
                onClick={() => {
                  navigate("/candidate/register");
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
         Register
                </p>
              </li>
             </> 
              }
           
              {/* <li
                className="sidebar-nav-item"
                onClick={() => {
                  navigate("/candidate/contact-us");
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
       */}
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarSideBar;
