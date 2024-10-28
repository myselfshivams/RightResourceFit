import "../styles/AdminDashboard.css"
import AdminSidebar from "../components/AdminSidebar";
import SummaryCards from '../components/SummaryCards';
import WelcomeHeader from '../components/WelcomeHeader';
import ApplicationChart from '../components/ApplicationChart';
import RecentJobPosts from '../components/RecentJobPosts';
import Footer from '../components/Footer3';
import Navbar from "./Navbar";

const AdminDashboard = () => {

  return (
    <div className="app-container">
        <AdminSidebar></AdminSidebar>
      <div className="main-content">
        <div className="Heder">
      <Navbar/>
      </div>
        <WelcomeHeader />
        
        <div className="dashboard-content">
          <SummaryCards />
          <div className="charts-and-table">
            <div className="application-chart">
              <ApplicationChart />
            </div>
            <div className="recent-job-posts">
              <RecentJobPosts />
            </div>
          </div>
        </div>
        <div className="Futer">
      <Footer/>
      </div>

      </div>
    </div>
  )
}

export default AdminDashboard



