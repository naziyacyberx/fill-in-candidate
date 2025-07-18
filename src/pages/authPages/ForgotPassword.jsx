import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { sendOtpApi } from "../../apis/AuthApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);  
    const [email, setEmail] = useState("");
  
    const handleSendOtp = async (e) => {
      e.preventDefault();
      setLoading(true); 
     
  
      try {
        const Response = await sendOtpApi(email);
       if(Response?.data?.status=="success"){
        navigate("/verify-otp", { state: { email, fromForgotPassword: true } });
       }
      } catch (error) {
        console.error("Otp Send Error:", error);
      } finally {
        setLoading(false);  
      }
    };


  if(loading){
    return <div>Loading...</div>
  }

  return (
    <>
      <section className="login-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 login-left-side">
              <div className="">
                <img className="img-fluid" src="/images/login-bg.png" alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="register-container">
                <div className="auth-logo">
                  <img
                    className="imf-fluid"
                    src="/images/logo.png"
                    alt="Fill_in Logo"
                  />
                </div>
                <h2>Forgot Your Password</h2>
                {/* <p>Enter your email to send otp</p> */}

                 <p className=""> <span style={{ color: "#0165FC" }}>
Forgot your password? {" "}
                   
                  </span>
                   Enter your email address below, <br />
and we'll send you a link to reset it.</p>
                <form onSubmit={handleSendOtp}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  <p className="mt-3 forget-pswd-bottom"><span style={{ color: "#0165FC" }} className="cursor-pointer" onClick={() => navigate("/candidate/register")}>Login?/Sign Up?

                </span>
                </p>
                  </div>

                  <button
                    type="submit"
                    className="google-btn login-btn"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Otp"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
