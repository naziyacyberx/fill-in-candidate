import { Outlet } from "react-router-dom";
import Navbar from "../sections/common/Navbar";
import Footer from "../sections/common/Footer";

const CandidateLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default CandidateLayout;
