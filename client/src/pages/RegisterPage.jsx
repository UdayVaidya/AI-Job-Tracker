import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to="/dashboard" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="max-w-md rounded-2xl p-4 bg-white flex justify-evenly flex-col items-center  min-h-[50%]  ">
        <h2 className="font-bold text-7xl mb-8 text-gray-800">Register</h2>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="w-full border p-2 text-gray-800 rounded placeholder-gray-800"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            className="w-full border p-2 text-gray-800 rounded placeholder-gray-800"
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="w-full border p-2 text-gray-800 rounded placeholder-gray-800"
            onChange={handleChange}
          />
          <button className="w-full bg-gray-800 hover:bg-gray-400 text-white p-2 rounded">
            Register
          </button>
        </form>
        <p className="text-gray-800">
          Already have an account?{" "}
          <Link to="/" className="text-gray-800 font-bold hover:text-gray-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
