import axios from "axios";
import { baseUrl } from "../utils/BaseUrl";
import { ErrorToaster, SuccessToaster } from "../utils/Toaster";





export const loginUserApi = async (data ) => {
  try {
    const response = await axios.post(`${baseUrl}candidate/login`, data );

    if (response?.data?.status) {
            const token = response?.data?.token;
            if (token) {
        localStorage.setItem("fillInToken", token);
      }
 
      SuccessToaster(response?.data?.message);

    } else {
      ErrorToaster("Login failed!");
    }

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    ErrorToaster(error?.response?.data?.message || "Something went wrong!");
    return error?.response;
  }
};




export const registerUserApi = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}candidate/registraion`, data);

    if (response?.data?.status) {
      SuccessToaster(response?.data?.message);

    } else {
        ErrorToaster("Registration failed!");
    }

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    ErrorToaster(error?.response?.data?.message || "Something went wrong!");
    return error?.response;
  }
};



export const sendOtpApi = async (email) => {
    
  try {
    const response = await axios.post(`${baseUrl}candidate/send-otp`, { email });

    if (response?.data?.status) {
      SuccessToaster(response?.data?.message);

    } else {
        ErrorToaster("Sending OTP failed!");
    }

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    ErrorToaster(error?.response?.data?.message || "Something went wrong!");
    return error?.response;
  }
};


export const verifyOtpApi = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}candidate/verify-otp`, data);

    if (response?.data?.status) {
      SuccessToaster(response?.data?.message);

    } else {
      ErrorToaster("Vefification failed!");
    }

    return response;
  } catch (error) {
    console.error("Vefiy Otp API Error:", error);
    ErrorToaster(error?.response?.data?.message || "Something went wrong!");
    return error?.response;
  }
};



export const changePasswordApi = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}candidate/change-password`, data);

    if (response?.data?.status) {
      SuccessToaster(response?.data?.message);

    } else {
      ErrorToaster("Vefification failed!");
    }

    return response;
  } catch (error) {
    console.error("Change Password API Error:", error);
    ErrorToaster(error?.response?.data?.message || "Something went wrong!");
    return error?.response;
  }
};