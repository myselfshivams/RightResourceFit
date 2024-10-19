import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/protectedRoute"; 
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
