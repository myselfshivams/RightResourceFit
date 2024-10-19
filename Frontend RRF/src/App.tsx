import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/protectedRoute";
import AdminProtectedRoute from "./components/adminprotectedroute"; 
import ErrorPage from "./components/Custom404";
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./pages/UserDashboard";
import Contactus from "./pages/Contactus";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />\
          <Route path="/contact" element={<Contactus />} />
          <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /> </ProtectedRoute>} />
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
