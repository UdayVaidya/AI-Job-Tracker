import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link, Navigate } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout.jsx";
import LoaderComponent from "../components/LoaderComponent.jsx";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Register error:", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Error Registering !!!"
      );
    }
    setLoading(false);
  };

  return (
    <AuthLayout side="right">
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
          <LoaderComponent />
        </div>
      )}
      
      {/* RIGHT: Register */}
      <div className="p-8 md:p-12 flex flex-col justify-center-safe">
        <h1 className="font-bold text-5xl md:text-6xl mb-4 text-[#535353] tracking-wide">
          Hi, Welcome
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 text-gray-800 rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
            onChange={handleChange}
          />

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
            Register
          </button>
        </form>

        <p className="text-gray-700 mt-6">
          Already have an account?{" "}
          <Link to="/" className="font-bold hover:text-gray-900">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
