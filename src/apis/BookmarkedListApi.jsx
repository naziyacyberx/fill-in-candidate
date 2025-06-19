import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";

export const bookmarkedListApi = async () => {
  try {
    const token = localStorage.getItem("fillInToken");

    const response = await axios.get(`${baseUrl}candidate/bookmarked-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching Clinic Details:", error.response?.data || error.message);
    return null;
  }
};
