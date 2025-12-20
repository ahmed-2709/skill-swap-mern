import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Auth/Login";  
import Signup from "./pages/Auth/Sign"; 
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile/userProfile";
import Auth from "./pages/Auth/Auth"
import './index.css'; 

function App() {
    return (
  <>
    <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={< Dashboard/>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      </Router>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                pauseOnHover
                closeOnClick
            />
        </>
  );
}

export default App;

