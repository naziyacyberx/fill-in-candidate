import React from 'react'
import "../../styles/footer.css"


const Footer = () => {
  return (
<>
<footer className="footer">
  <div className="footer-container container">
    {/* Logo + Description */}
    <div className="footer-box">
      <img className="img-fluid footer-logo" src="/images/logo.png" alt="Logo"/>
      <p className="footer-desc">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy.
      </p>
      <div className="footer-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
    {/* Resources */}
    <div className="footer-box footer-left-box">
      <h4>Resources</h4>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Jobs</a>
        </li>
        <li>
          <a href="#">Candidates</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
      </ul>
    </div>
    {/* More */}
    <div className="footer-box">
      <h4>More</h4>
      <ul>
        <li>
          <a href="#">Privacy</a>
        </li>
        <li>
          <a href="#">Help</a>
        </li>
        <li>
          <a href="#">Terms &amp; Conditions</a>
        </li>
        <li>
          <a href="#">Reviews</a>
        </li>
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
  )
}

export default Footer
