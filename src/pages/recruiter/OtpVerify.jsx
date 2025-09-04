import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RecruiterSendOtpApi,
  RecruiterVerifyOtpApi,
} from "../../apis/AuthApi";

const OtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(120); // <-- timer state
  const inputs = useRef([]);

  // start countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 4) return;
    setLoading(true);
    try {
      const response = await RecruiterVerifyOtpApi({ email, otp: finalOtp });
      if (response?.data?.status === "success") {
        if (location.state?.fromForgotPassword) {
          navigate("/change-password", { state: { email } });
        } else {
          navigate("/recruiter/login");
        }
      }
    } catch (err) {
      console.error("OTP Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await RecruiterSendOtpApi(email);
      setTimer(120); // reset timer on resend
    } catch (err) {
      console.error("Resend OTP error:", err);
    } finally {
      setResending(false);
    }
  };
// format function bana do
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
};

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light p-5">
          <img
            src="/images/login-bg.png"
            alt="Illustration"
            className="img-fluid"
            style={{ maxHeight: "80%" }}
          />
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div style={{ width: "80%", maxWidth: 400 }}>
            <div className="text-center mb-4">
              <img src="/images/logo.png" alt="Logo" height={50} />
              <h4 className="mt-3">OTP Verification</h4>
              <p className="text-muted">
                We sent a 4-digit OTP to <strong>{email}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    ref={(el) => (inputs.current[index] = el)}
                    className="form-control text-center mx-1"
                    style={{
                      width: "55px",
                      height: "55px",
                      fontSize: "24px",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
<div className="text-center mb-3">
  {timer > 0 && (
    <span className="text-muted">
      Resend OTP in {formatTime(timer)} min
    </span>
  )}
</div>


              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>

              <div className="text-center">
                <span className="text-muted">Didn't receive the OTP?</span>{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={handleResend}
                  disabled={resending || timer > 0} // disable until timer ends
                >
                  {resending ? "Resending..." : "Resend"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
