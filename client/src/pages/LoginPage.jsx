import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link, Navigate } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import LoaderComponent from "../components/LoaderComponent";

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Error Logging in !!!");
    }
    setLoading(false);
  };

  return (
    <AuthLayout side="left">
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
          <LoaderComponent />
        </div>
      )}
      <div className="p-8 md:p-12 flex flex-col justify-center ">
        <h1 className="font-bold text-5xl md:text-6xl mb-4 text-[#535353] tracking-wide">
          Welcome Back
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="email"
            placeholder="Email"
            className="w-full border p-3 text-gray-800 rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-3 text-[#575757] rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
            onChange={handleChange}
          />

          <button className="w-full bg-[#575757] hover:bg-[#4a4a4a] text-xl transition text-white p-3 rounded-lg tracking-wide">
            Login
          </button>
        </form>

        <p className="text-gray-700 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="font-bold hover:text-gray-900">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>


  );

}
export default LoginPage
