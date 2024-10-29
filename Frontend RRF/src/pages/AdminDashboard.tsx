import "../styles/AdminDashboard.css"
import AdminSidebar from "../components/AdminSidebar";
import SummaryCards from '../components/SummaryCards';
import WelcomeHeader from '../components/WelcomeHeader';
import ApplicationChart from '../components/ApplicationChart';
import RecentJobPosts from '../components/RecentJobPosts';


const AdminDashboard = () => {

  return (
    <div className="app-container">
        <AdminSidebar></AdminSidebar>
      <div className="main-content">
    
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
    
      </div>
    </div>
  )
}

export default AdminDashboard



