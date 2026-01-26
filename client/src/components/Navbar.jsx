import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from '../assets/jobtrackr.svg';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="backdrop-blur-2xl bg-opacity-50  shadow p-2 md:p-4 flex justify-between items-center rounded-2xl sticky top-2 z-50 mx-2 md:mx-0">
      <Link
        to="/"
        className="flex items-center"
      >
        <img src={logo} alt="AI Job Tracker" className="h-8 w-auto md:h-10" />
      </Link>
      <div className="flex gap-2 md:gap-4 items-center">
        {!user && (
          <>
            <Link
              to="/"
              className="text-white hover:text-gray-800 font-bold transition-all duration-200 text-sm md:text-base px-2 py-1"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-white hover:text-gray-800 font-bold transition-all duration-200 text-sm md:text-base px-2 py-1"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="hidden md:block text-white text-xl">
              Hello, {user.name.split(" ")[0]}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-white hover:text-red-500 transition-all duration-300 text-white px-2 py-1 rounded text-sm md:text-lg"
            >
              Logout
            </button>
          </>
        )}

        <div className="profile">
          <Link to="/profile">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
              alt="profile"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
