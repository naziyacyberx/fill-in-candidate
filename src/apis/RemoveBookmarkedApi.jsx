import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";
import { ErrorToaster } from "../utils/Toaster";



export const removeBookmarkedApi = async (id) => {
  try {
    const token = localStorage.getItem("fillInToken");
    const response = await axios.post(`${baseUrl}candidate/remove-bookmarked/${id}`,  {} , {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Something went wrong while delete the job.";
    ErrorToaster(message); 
    throw error; 
  }
};
