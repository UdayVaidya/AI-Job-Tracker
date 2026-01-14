import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await API.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Error Logging in !!!");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="max-w-md rounded-2xl p-4 bg-white flex justify-evenly flex-col items-center  min-h-[50%]  ">
        <h2 className="font-bold text-7xl mb-8 text-gray-800">Login</h2>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Submit
          </button>
        </form>
        <p className="text-gray-800">Don't have an account? <Link to="/register" className="text-gray-800 font-bold hover:text-gray-400" >Register</Link></p>
      </div>
    </div>
  );
}

export default LoginPage