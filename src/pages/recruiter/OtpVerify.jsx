import React, { useState, useRef } from "react";
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
  const inputs = useRef([]);

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
    } catch (err) {
      console.error("Resend OTP error:", err);
    } finally {
      setResending(false);
    }
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
                    style={{ width: "55px", height: "55px", fontSize: "24px", borderRadius: "8px" }}
                  />
                ))}
              </div>

              <div className="text-center mb-3">
                <span className="text-muted">00:30 sec left</span>
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
                  disabled={resending}
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




// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { RecruiterSendOtpApi, RecruiterVerifyOtpApi, verifyOtpApi } from "../../apis/AuthApi";
// // import { sendOtpApi, verifyOtpApi } from "../../apis/AuthApi";

// const OtpVerify = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email || "";
//   const [loading, setLoading] = useState(false);
//   const [loadingResend, setLoadingResend] = useState(false);
//   const [otp, setOtp] = useState("");

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const data = {
//       email,
//       otp,
//     };
//     try {
//       const response = await RecruiterVerifyOtpApi(data);
//       if (response?.data?.status === "success") {
//         if (location.state?.fromForgotPassword) {
//           navigate("/change-password", { state: { email } });
//         } else {
//           navigate("/recruiter/login");
//         }
//       }
//     } catch (error) {
//       console.error("OTP Verification Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async (e) => {
//     e.preventDefault();
//     setLoadingResend(true);
//     console.log("hii");
    

//     try {
//       const Response = await RecruiterSendOtpApi(email);
//       console.log(Response, "Resend OTP response");
//     } catch (error) {
//       console.error("Resend OTP Error:", error);
//     } finally {
//       setLoadingResend(false);
//     }
//   };

//   return (
//     <>
//       <section className="login-section">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-6">
//               <div className="login-left-main">
//                 <img className="img-fluid" src="/images/login-bg.png" alt="" />
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="register-container">
//                 <div className="auth-logo">
//                   <img
//                     className="imf-fluid"
//                     src="/images/logo.png"
//                     alt="Fill_in Logo"
//                   />
//                 </div>
//                 <h2>Verify Otp</h2>
//                 <p>Enter your email and password to login</p>
//                 <form onSubmit={handleVerifyOtp}>
//                   <div className="form-group">
//                     <label htmlFor="email">Enter your 6 digits OTP *</label>
//                     <input
//                       type="number"
//                       id="number"
//                       className="form-control"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="google-btn login-btn"
//                     disabled={loading}
//                   >
//                     {loading ? "Verify..." : "Submit"}
//                   </button>
//                   <button
//                     onClick={handleResendOtp}
//                     className="google-btn"
//                     disabled={loadingResend}
//                   >
//                     {loadingResend ? "Resending..." : "Resend Otp"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default OtpVerify;
