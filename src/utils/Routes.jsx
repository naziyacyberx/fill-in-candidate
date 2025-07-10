import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts (Optional but clean)
import CandidateLayout from "../layouts/CandidateLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";

// Candidate Pages
import Home from "../homepage/home";
import JobDetails from "../pages/JobDetails";
import Login from "../pages/authPages/Login";
import Registration from "../pages/authPages/Registration";
import Verify from "../pages/authPages/Verify";
import ForgotPassword from "../pages/authPages/ForgotPassword";
import ChangePassword from "../pages/authPages/ChangePassword";
import Filter from "../pages/Filter";
import ViewClinic from "../pages/ViewClinic";
import Reviews from "../pages/Reviews";
import SavedJobs from "../pages/SavedJobs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Messages from "../pages/Messages";
import Applies from "../pages/Applies";
import Profile from "../pages/Profile";
import MyProfile from "../pages/MyProfile";
import ScheduleInterview from "../pages/ScheduleInterview";
import AboutUs from "../pages/AboutUs";
import MyRatingsReviews from "../pages/MyRatingsReviews";
import Jobs from "../pages/Jobs";
import ChatDetail from "../pages/ChatDetail";

// Recruiter Pages
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import JobCategory from "../pages/recruiter/JobCategory";
import CandidateDetail from "../pages/recruiter/CandidateDetail";
import RecruiterLogin from "../pages/recruiter/Login";
import Register from "../pages/recruiter/Register";
import RecruiterForgotPassword from "../pages/recruiter/ForgotPassword"
import ResetPassword from "../pages/recruiter/ResetPassword";
import SearchProfiles from "../pages/recruiter/SearchProfiles";
import RecruiterScheduleInterview from "../pages/recruiter/ScheduleInterview"
import RatingsAndReviews from "../pages/recruiter/RatingsAndReviews";
import CreateJob from "../pages/recruiter/CreateJob";
import RecruiterProfile from "../pages/recruiter/RecruiterProfile";
import PostedJobs from "../pages/recruiter/PostedJobs";
import ScheduledInterviews from "../pages/recruiter/ScheduledInterviews";
import MyRatings from "../pages/recruiter/MyRatings";
import RecruiterAboutUs from "../pages/recruiter/AboutUs"
import RecruiterPrivacyPolicy from "../pages/recruiter/PrivacyPolicy";
import RecruiterMessages from "../pages/recruiter/Messages"


const router = createBrowserRouter([
  // Candidate Route Group
  {
    path: "/candidate",
    element: <CandidateLayout />, // Optional layout
    children: [
      { path: "", element: <Home /> }, // /candidate
      { path: "job-details/:id", element: <JobDetails /> },

      { path: "filter", element: <Filter /> },
      { path: "view-clinic/:id", element: <ViewClinic /> },
      { path: "reviews/:id", element: <Reviews /> },
      { path: "saved-jobs", element: <SavedJobs /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "messages", element: <Messages /> },
      { path: "applies", element: <Applies /> },
      { path: "profile", element: <Profile /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "schedule-interview", element: <ScheduleInterview /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "my-ratings-reviews", element: <MyRatingsReviews /> },
      { path: "jobs", element: <Jobs /> },
      { path: "chat-detail", element: <ChatDetail /> },
    ],
  },
        { path: "/candidate/login", element: <Login /> },
      { path: "/candidate/register", element: <Registration /> },
      { path: "/candidate/verify-otp", element: <Verify /> },
      { path: "/candidate/forgot-password", element: <ForgotPassword /> },
      { path: "/candidate/change-password", element: <ChangePassword /> },

  // Recruiter Route Group
  {
    path: "/recruiter",
    element: <RecruiterLayout />, // Optional layout
    children: [
      {path: "", element: <RecruiterDashboard /> },
      {path: "job-category", element: <JobCategory /> },
      {path: "candidate-detail/:id", element: <CandidateDetail /> },
      {path:"search-profiles", element:<SearchProfiles/>},
      {path:"schedule-interview/:id", element: <RecruiterScheduleInterview/>},
      {path:"ratings-and-reviews", element: <RatingsAndReviews/>},
      {path:"create-job", element: <CreateJob/>},
      {path:"profile", element:<RecruiterProfile/>},
      {path:"posted-jobs", element:<PostedJobs/>},
      {path:"scheduled-interviews", element:<ScheduledInterviews/>},
      {path:"my-ratings", element:<MyRatings/>},
      {path:"about-us", element:<RecruiterAboutUs/>},
      {path:"privacy-policy", element:<RecruiterPrivacyPolicy/>},
      {path:"messages", element:<RecruiterMessages/>}
      // {path:"login", element:<RecruiterLogin/>}
      // Add more recruiter routes here
    ],
  },
    { path: "/recruiter/login", element: <RecruiterLogin /> },
    {path:"/recruiter/register", element:<Register/>},
    {path:"/recruiter/forgot-password", element:<RecruiterForgotPassword/>},
    {path:"/recruiter/reset-password", element:<ResetPassword/>},

  // Optional fallback route
  {
    path: "*",
    element: <div>404 Page Not Found</div>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
