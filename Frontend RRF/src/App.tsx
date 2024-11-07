import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Dashboard from "./pages/Dashboard";
import Home from './pages/Landing';
import ProtectedRoute from './components/protectedRoute';
import AdminProtectedRoute from './components/adminprotectedroute';
import LoginProtectedRoute from './components/Loginprotectedroute';
import ErrorPage from './components/Custom404';
import ResetPassword from './pages/ResetPassword';
import UserDashboard from './pages/UserDashboard';
import Contactus from './pages/Contactus';
import About from './pages/About';
import Logout from './pages/Logout';
import UserNotifications from './pages/notifications';
import UserSettings from './pages/UserSettings';
import UserJobs from './pages/UserJob';
import UserApplications from './pages/UserApplications';
import UserSearch from './pages/search';
import UserManageApplications from './pages/UserManageApplications';
import { metadata } from './metadata';
import AdminDashboard from './pages/AdminDashboard';
// import Notification from "./pages/notifications";
import { Helmet } from 'react-helmet';
import AdminManageJob from './components/AdminManageJob';
import AdminCreateJob from './components/AdminCreateJob';
import AdminUserManage from './components/AdminUserManage';
import AdminNotification from './pages/AdminNotification';
import AdminApplication from './pages/AdminApplication';

function App() {
  return (
    <>
          <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
        <meta name="author" content={metadata.author} />
        <link rel="canonical" href={metadata.url} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={metadata.url} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginProtectedRoute>
                <Login />
              </LoginProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/register"
            element={
              <LoginProtectedRoute>
                <Login />
              </LoginProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/reset-password/:resetToken"
            element={
              <LoginProtectedRoute>
                <ResetPassword />
              </LoginProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contactus />} />

          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/search"
            element={
              <ProtectedRoute>
                <UserSearch />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/jobs"
            element={
              <ProtectedRoute>
                <UserJobs />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/applications"
            element={
              <ProtectedRoute>
                <UserApplications />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/settings"
            element={
              <ProtectedRoute>
                <UserSettings />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/notifications"
            element={
              <ProtectedRoute>
                <UserNotifications />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/manage"
            element={
              <ProtectedRoute>
                <UserManageApplications />{' '}
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <AdminProtectedRoute>
                <AdminNotification />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/createJob"
            element={
              <AdminProtectedRoute>
                <AdminCreateJob />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/userManage"
            element={
              <AdminProtectedRoute>
                <AdminUserManage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <AdminProtectedRoute>
                <AdminApplication />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/manageJob"
            element={
              <AdminProtectedRoute>
                <AdminManageJob />
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
