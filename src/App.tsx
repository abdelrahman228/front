import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ConfirmEmail from "./pages/Auth/ConfirmEmail";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import ResendConfirmEmail from "./pages/Auth/ResendConfirmEmail";
import ResetPassword from "./pages/Auth/ResetPassword";
import Signup from "./pages/Auth/Signup";
import VerifyOtp from "./pages/Auth/VerifyOtp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";
import Home from "./pages/Home";
import SendMessage from "./pages/SendMessage";

const App = () => (
  <div className="min-h-screen bg-background text-text">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/resend-confirm-email" element={<ResendConfirmEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/send/:receiverId" element={<SendMessage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <ToastContainer theme="dark" position="top-center" rtl />
  </div>
);

export default App;
