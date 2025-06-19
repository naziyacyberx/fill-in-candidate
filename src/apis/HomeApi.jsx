import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";


export const homeApi = async () => {
  try {
        const token = localStorage.getItem("fillInToken");

    const response = await axios.get(`${baseUrl}dashboard` ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } );

    console.log("response",response);
    
    
    return response;
  } catch (error) {
    console.error("Error fetching Home Details :", error.response || error);
    return null;
  }
};
