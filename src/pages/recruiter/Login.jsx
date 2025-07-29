import React, { useState } from "react";
import "../../styles/auth.css";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUserApi, RecruiterLoginUserApi, RecruiterSendOtpApi, sendOtpApi } from "../../apis/AuthApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getDeviceId } from "../../utils/deviceId";


const Login = () => {
    const fcmToken = useSelector((state) => state.fcm.token);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirectTo = location.state?.from || "/recruiter";
    const deviceId = getDeviceId();
  console.log("Device ID:", deviceId);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email,
      password,
      fcm_token: fcmToken,
      device_id: deviceId,
    };

    try {
      const loginResponse = await RecruiterLoginUserApi(data, navigate);
      console.log(loginResponse, "loginResponse")
      if (
        loginResponse?.data?.message ==
        "Account not verified. Please verify your email."
      ) {
        const otpResponse = await RecruiterSendOtpApi(email);
        console.log(otpResponse, "otpResponse");
        navigate("/recruiter/otp-verify", { state: { email } });

      }
      else if(  loginResponse?.data?.status == "success") {

        navigate(redirectTo);
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // your Google login logic here
  };

  return (
    <>
      <section className="login-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6  login-left-side">
              <div >
                {/* <div className="login-left-main"> */}
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
                <h2>Login</h2>
                <form onSubmit={handleLogin}>

                  <p>If you already <span style={{ color: "#0165FC" }}>

                    have an account, <br />
                  </span>
                    please sign in using your email address.</p>
                 

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
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <div className="eye-main">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div
                        className="password-toggle dash-login"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                  </div>
                  <div className="remember-box">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                      />
                      <label className="form-check-label remember-me-text" htmlFor="rememberMe">
                        Remember Me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="forgot-password-link"
                      onClick={() => navigate("/recruiter/forgot-password")}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="google-btn login-btn"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log In"}
                  </button>
                  {/* <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="google-btn mt-4"
                  >
                    <img src="images/google_img.png" alt="google-img" />
                    Sign in with Google
                    </button> */}
                </form>
                <p className="mt-3">Don't Have an Account? <span style={{ color: "#0165FC" }} className="cursor-pointer" onClick={() => navigate("/recruiter/register")}>Sign Up. </span> </p> 
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
