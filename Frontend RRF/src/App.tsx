import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Landing";
import ProtectedRoute from "./components/protectedRoute";
import AdminProtectedRoute from "./components/adminprotectedroute"; 
import LoginProtectedRoute from "./components/Loginprotectedroute"; 
import ErrorPage from "./components/Custom404";
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./pages/UserDashboard";
import Contactus from "./pages/Contactus";
import About from "./pages/About";
import Logout from "./pages/Logout"
import UserNotifications from "./pages/notifications";
import UserSettings from "./pages/UserSettings";
import UserJobs from "./pages/UserJob";
import UserApplications from "./pages/UserApplications";
import UserSearch from "./pages/search";
import UserManageApplications from "./pages/UserManageApplications";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginProtectedRoute>
                <Login />
              </LoginProtectedRoute>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<LoginProtectedRoute>
                <Login />
              </LoginProtectedRoute>} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reset-password/:resetToken" element={<LoginProtectedRoute>
                <ResetPassword />
              </LoginProtectedRoute>} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /> </ProtectedRoute>} />
          <Route path="/user/search" element={<ProtectedRoute><UserSearch /> </ProtectedRoute>} />
          <Route path="/user/jobs" element={<ProtectedRoute><UserJobs /> </ProtectedRoute>} />
          <Route path="/user/applications" element={<ProtectedRoute><UserApplications /> </ProtectedRoute>} />
          <Route path="/user/settings" element={<ProtectedRoute><UserSettings /> </ProtectedRoute>} />
          <Route path="/user/notifications" element={<ProtectedRoute><UserNotifications /> </ProtectedRoute>} />
          <Route path="/user/manage" element={<ProtectedRoute><UserManageApplications /> </ProtectedRoute>} />
          <Route 
            path="/dashboard" 
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            } 
          />
          <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;