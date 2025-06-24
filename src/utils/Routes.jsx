import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import ProfilePage from "../pages/MyProfile";
import MyProfile from "../pages/MyProfile";
import ScheduleInterview from "../pages/ScheduleInterview";
import AboutUs from "../pages/AboutUs";
import MyRatingsReviews from "../pages/MyRatingsReviews";
import Jobs from "../pages/Jobs";






const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/job-details/:id",
    element: <JobDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Registration />,
  },

  {
    path: "/verify-otp",
    element: <Verify />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/change-password",
    element: <ChangePassword />,
  },

  {
    path: "/filter",
    element: <Filter />,
  },

  {
    path: "/view-clinic/:id",
    element: <ViewClinic />,
  },

  {
    path: "/reviews/:id",
    element: <Reviews />,
  },

   {
    path: "saved-jobs",
    element: <SavedJobs />,
  },
   {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
   {
    path: "messages",
    element: <Messages />,
  },
   {
    path: "applies",
    element: <Applies />,
  },
   {
    path: "profile",
    element: <Profile />,
  },
   {
    path: "my-profile",
    element: <MyProfile />,
  },
   {
    path: "schedule-interview",
    element: <ScheduleInterview />,
  },
   {
    path: "about-us",
    element: <AboutUs />,
  },
   {
    path: "my-ratings-reviews",
    element: <MyRatingsReviews />,
  },
   {
    path: "jobs",
    element: <Jobs />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
