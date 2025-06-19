import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";
import { SuccessToaster, ErrorToaster } from "../utils/Toaster";

export const addReviewApi = async (payload) => {
  try {
    const token = localStorage.getItem("fillInToken");
    const response = await axios.post(`${baseUrl}candidate/add-review`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.status === "success") {
      SuccessToaster("Review Submitted Successfully");
    }

    return response;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Something went wrong while submitting the review.";
    ErrorToaster(message); 
    throw error; 
  }
};
