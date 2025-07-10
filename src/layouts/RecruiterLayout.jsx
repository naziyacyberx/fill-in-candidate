import { Outlet } from "react-router-dom";
import Navbar from "../components/recruiter/Navbar";
import Footer from "../components/recruiter/Footer";

const RecruiterLayout = () => (
  <>
    <Navbar/>
    <main>
      <Outlet />
    </main>
    <Footer/>
  </>
);

export default RecruiterLayout;
 