import React, { useState } from "react";
import "../../styles/auth.css";
import { useNavigate } from "react-router-dom";
import { recruiterRegisterUserApi, RecruiterSendOtpApi, registerUserApi, sendOtpApi } from "../../apis/AuthApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required.";  
    }

    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setLoading(true);
    const data = {
      email,
      password,
      confirmPassword,
      name,
      phone,
      // device_token: "dummy Token",
    };

    try {
      const registerResponse = await recruiterRegisterUserApi(data);

      if (registerResponse?.data?.status == "success") {        
        const otpResponse = await RecruiterSendOtpApi(email);
        console.log("OTP sent response:", otpResponse);
        navigate("/recruiter/otp-verify", { state: { email } });
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {

  };

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
                    className="img-fluid"
                    src="/images/logo.png"
                    alt="Fill_in Logo"
                  />
                </div>
                <h2>Register</h2>
                <p>Enter your email and password to login</p>
                <form onSubmit={handleRegister}>
                  <div className="form-group">
                    <label htmlFor="email">Name *</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {error.name && (
                      <small className="text-danger">{error.name}</small>
                    )}
                  </div>
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
                    {error.email && (
                      <small className="text-danger">{error.email}</small>
                    )}
                  </div>

                       <div className="form-group">
                    <label htmlFor="email">Phone Number *</label>
                    <input
                      type="number"
                      id="number"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                    {error.password && (
                      <small className="text-danger">{error.password}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Confirm Password *</label>
                    <div className="eye-main">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <div
                        className="password-toggle dash-login"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                    {error.confirmPassword && (
                      <small className="text-danger">
                        {error.confirmPassword}
                      </small>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="google-btn login-btn"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
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
                <p className="mt-3">Already Have an Account? <span style={{ color: "#0165FC" }} className="cursor-pointer" onClick={() => navigate("/recruiter/login")}>Login

                </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
