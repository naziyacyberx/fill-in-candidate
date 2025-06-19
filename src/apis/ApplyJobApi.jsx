import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";
import { SuccessToaster } from "../utils/Toaster";

export const applyJobApi = async (jobId) => {
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
    console.error("Error applying to job:", error.response?.data || error.message);
    throw error;
  }
};
