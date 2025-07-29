import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/reportpopup.css";
import { SuccessToaster } from "../utils/Toaster";
import { baseUrl } from "../utils/BaseUrl";

const ReportPopup = ({ onClose, job_id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const job_id = "3"; // Make this dynamic if needed




  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      job_id,
      description,
    };

  
    try {
      const token = localStorage.getItem("fillInToken");
      console.log("Token being sent:", token); // Debug

      if (!token) {
        toast.error("Token not found. Please login again.");
        return;
      }

      const response = await axios.post(
        `${baseUrl}candidate/report`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();
        SuccessToaster("Report submitted successfully")

    } catch (error) {
      console.error("API Error:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error("Error: " + errorMessage);
    }
  };

  return (
    <>
      <div className="report-popup-overlay">
        <div className="report-popup">
          <button className="close-popup-btn" onClick={onClose}>
            ✖
          </button>
          <h3>Report Job</h3>
          <form onSubmit={handleSubmit}>
            <label>Title*</label>
            <input
              type="text"
              className="report-input"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>Description*</label>
            <textarea
              className="report-textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button type="submit" className="submit-report-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
     
    </>
  );
};

export default ReportPopup;




// import { useState } from "react"
// import "../components/reportpopup.css"


// const ReportPopup = ({ onClose }) => {
//       const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");


//     const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Report Submitted", { title, description });
//     // You can add API call here
//     onClose(); 
//   };

//   return (
// <>
//  <div className="report-popup-overlay">
//       <div className="report-popup">
//         <button className="close-popup-btn" onClick={onClose}>✖</button>
//         <h3>Report Job</h3>
//         <form onSubmit={handleSubmit}>
//           <label>Title*</label>
//           <input
//             type="text"
//             className="report-input"
//             placeholder="Enter title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <label>Description*</label>
//           <textarea
//             className="report-textarea"
//             placeholder="Enter description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <button type="submit" className="submit-report-btn">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
// </>
//   )
// }

// export default ReportPopup
