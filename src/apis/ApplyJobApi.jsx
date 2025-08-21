import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";
import { ErrorToaster, SuccessToaster } from "../utils/Toaster";
import { useNavigate } from "react-router-dom";

export const applyJobApi = async (jobId) => {
  // const navigate = useNavigate()
  const token = localStorage.getItem("fillInToken");

  try {
    const response = await axios.post(
      `${baseUrl}candidate/apply-jobs/${jobId}`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
SuccessToaster(response.data.message)

return response.data;
} catch (error) {
    ErrorToaster(error.response.data.message)
    // navigate("/signin")
    console.error("Error applying to job:", error);
    throw error;
  }
};
