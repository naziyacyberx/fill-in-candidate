import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { changePasswordApi } from "../../apis/AuthApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChangePassword = async (e) => {
    const validationErrors = {};
    e.preventDefault();

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setLoading(true);
    const data = {
      password,
      email,
    };

    try {
      const changePasswordResponse = await changePasswordApi(data);
      if (changePasswordResponse?.data?.status == "success") {
        console.log("changePasswordResponse response:", changePasswordResponse);
        navigate("/candidate/login");
      }
    } catch (error) {
      console.error("Change Password  Error:", error);
    } finally {
      setLoading(false);
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
                <div className="auth-logo">
                  <img
                    className="imf-fluid"
                    src="/images/logo.png"
                    alt="Fill_in Logo"
                  />
                </div>
                <h2>Change Password</h2>
                <p>Enter your new password</p>
                <form onSubmit={handleChangePassword}>
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
                    {loading ? "Change Password..." : "Change Password"}
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

export default ChangePassword;
