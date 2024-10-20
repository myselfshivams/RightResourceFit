import Navbar from "./Navbar";
import "../styles/Landing.css"
import HeroSection from "./HeroSection";
import FavJobs from "./FavJobs";
import ReserveSpot from "./ReserveSpot";
import MapSection from "./MapSection";
// import Footer from "./Footer";
import Testimonials from "./Testimonials";
import Feedback from "./Feedback";

const Landing = () => {
  return (
   <>
   <Navbar />
   <HeroSection />
   <FavJobs />
   <ReserveSpot />
   <MapSection />
   <Testimonials/>
   <Feedback/>
   {/* <Footer /> */}
</>
  )
}

export default Landing;
