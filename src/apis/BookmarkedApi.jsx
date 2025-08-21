import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";
import { ErrorToaster } from "../utils/Toaster";
import { useNavigate } from "react-router-dom";



export const saveJobApi = async (id) => {

  try {
    const token = localStorage.getItem("fillInToken");
    const response = await axios.post(`${baseUrl}candidate/bookmarked/${id}`,  {} , {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {

    console.log("Error", error);
    return error
 
  }
};
