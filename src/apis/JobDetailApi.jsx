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
export const RecruiterjobDetailsApi = async (id) => {
  try {
    const token = localStorage.getItem("fillInToken");

    const response = await axios.get(`${baseUrl}recruiter/job-detail/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGxpbi1hZG1pbi5jeWJlcnhpbmZvc29sdXRpb24uY29tL2FwaS9yZWNydWl0ZXIvbG9naW4iLCJpYXQiOjE3NTIyMjc0MjcsImV4cCI6MTc1NDgxOTQyNywibmJmIjoxNzUyMjI3NDI3LCJqdGkiOiJZMjY5b3pxSXY1RjdtcTRwIiwic3ViIjoiNjMiLCJwcnYiOiIxOWU0M2I5N2YyMDI5ZTUzMDcyMzIwYzRjNzdjOTBkMTViMmMzM2ZkIn0.43eywrXj1GX9zhAhOLU1zQtytCnhuDM5Z9zg7EMHous`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching Job Details:", error.response?.data || error.message);
    return null;
  }
};
