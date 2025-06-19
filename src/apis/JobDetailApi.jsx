import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";

export const jobDetailsApi = async (id) => {
  try {
    const token = localStorage.getItem("fillInToken");

    const response = await axios.get(`${baseUrl}candidate/view-job/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching Job Details:", error.response?.data || error.message);
    return null;
  }
};
