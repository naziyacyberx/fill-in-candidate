import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOtpApi, verifyOtpApi } from "../../apis/AuthApi";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email,
      otp,
    };
    try {
      const response = await verifyOtpApi(data);
      if (response?.data?.status === "success") {
        if (location.state?.fromForgotPassword) {
          navigate("/change-password", { state: { email } });
        } else {
          navigate("/candidate/login");
        }
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setLoadingResend(true);

    try {
      const Response = await sendOtpApi(email);
      console.log(Response, "Resend OTP response");
    } catch (error) {
      console.error("Resend OTP Error:", error);
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <>
      <section className="login-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="login-left-main">
                <img className="img-fluid" src="/images/login-bg.png" alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="register-container">
                <div className="auth-logo cursor-pointer" onClick={()=>{navigate("/candidate")}}>
                  <img
                    className="imf-fluid"
                    src="/images/logo.png"
                    alt="Fill_in Logo"
                  />
                </div>
                <h2>Verify Otp</h2>
                <p>Enter your email and password to login</p>
                <form onSubmit={handleVerifyOtp}>
                  <div className="form-group">
                    <label htmlFor="email">Enter your 6 digits OTP *</label>
                    <input
                      type="number"
                      id="number"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="google-btn login-btn"
                    disabled={loading}
                  >
                    {loading ? "Verify..." : "Submit"}
                  </button>
                  <button
                    onClick={handleResendOtp}
                    className="google-btn"
                    disabled={loadingResend}
                  >
                    {loadingResend ? "Resending..." : "Resend Otp"}
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

export default Verify;
