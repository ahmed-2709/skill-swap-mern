import React, { useState } from "react";
import InputField from "../../components/InputField";
import { FaArrowCircleRight, FaArrowAltCircleRight } from "react-icons/fa"
import "./AuthForm.css";
import axios from "axios";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = ({ onSwitch }) => {
    console.log("onSwitch in Login:", onSwitch);
    const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [formData, setFormData] = useState({ email: "", password: "" });
   const navigate = useNavigate();
   const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}api/auth/login`, formData);
      login(res.data.token, res.data.user);  // assuming backend sends { token, user }
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
  <div className="w-full max-w-4xl h-[450px] bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
    
    {/* Left Panel */}
    <div className="relativeflex-1 hidden md:flex flex-col justify-center items-center text-white p-8 bg-white/10 backdrop-blur-xl hidden md:flex flex-col justify-center items-center bg-gradient-to-tr from-indigo-700 to-purple-700 text-white p-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Empower Your Skills.</h1>
        <p className="text-md md:text-lg text-white/80">Join SkillSwap — Share, Learn, and Grow Together.</p>
      </div>
    </div>

    {/* Right Panel (Login Form) */}
    <div className="flex-1 flex flex-col justify-center p-6 md:p-12 text-white">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 rounded-lg transition duration-300"
          >
            Login <FaArrowAltCircleRight className="inline ml-2" />
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <span
                              className="underline cursor-pointer text-indigo-200 font-medium"
                              onClick={() => onSwitch()}
          >
            Signup
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
