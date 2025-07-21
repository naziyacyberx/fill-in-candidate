import React from 'react';
import "../../styles/footer.css";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="footer">  
        <div className="footer-container container">  
          {/* Logo + Description */}  
          <div className="footer-box">  
            <img className="img-fluid footer-logo" src="/images/logo.png" alt="Logo" />
            <p className="footer-desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy.  
            </p>  
  
            {/* Social icons */}
            <div className="footer-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <FaYoutube />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="footer-box footer-left-box">
            <h4>Resources</h4>
            <ul>
              {/* <li><a href="/">Home</a></li> */}
              <li><Link to="/recruiter">Home</Link></li>
              <li><Link to=" ">Jobs</Link></li>
              <li><Link to="/recruiter/messages">Messages</Link></li>
              <li><Link to="/recruiter/applies">Applied</Link></li>
              
              {/* <li><a href="#">Jobs</a></li>
              <li><a href="#">Candidates</a></li>
              <li><a href="#">Blog</a></li> */}
            </ul>
          </div>

          {/* More */}
          <div className="footer-box">
            <h4>More</h4>
            <ul>
              <li><Link to="/candidate/my-ratings-reviews">Review</Link></li>
              <li><Link to="/candidate/saved-jobs">Saved</Link></li>
              <li><Link to="/candidate/about-us">about-us</Link></li>
              <li><Link to="/candidate/privacy-policy">Privacy</Link></li>
              {/* <li><a href="#">Privacy</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Reviews</a></li> */}
            </ul>
          </div>

          {/* Download App */}
          <div className="footer-box">
            <h4>Download App</h4>
            <p>
              Download our Apps and get extra
              <br />
              15% Discount on your first Order...!
            </p>
            <div className="footer-apps">
              <img className='img-fluid' src="/images/app-store 1.png" alt="App Store" />
              <img className='img-fluid' src="/images/google-play 1.png" alt="Google Play" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
