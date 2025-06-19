import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";

export const settingApi = async () => {
  try {
    const token = localStorage.getItem("fillInToken");

    const response = await axios.get(`${baseUrl}candidate/setting`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching settings Details:", error.response?.data || error.message);
    return null;
  }
};
