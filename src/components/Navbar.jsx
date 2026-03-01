import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/logos/logo2F.png";
import { FaHome, FaShoppingCart, FaUser, FaBox } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { toast } from "react-toastify";

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const email = localStorage.getItem("loggedInUser");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8080/api/user/profile?email=${email}`)
        .then(res => res.json())
        .then(data => setProfileImage(data.profileImage));
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    setShowProfile(false);
    toast.success("Logged out successfully ✅");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-green-900 to-green-700 text-white px-6 py-4 shadow-xl relative">
      <div className="flex items-center justify-between">

        {/* ===== LEFT LOGO ===== */}
        <div>
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 object-contain hover:rotate-6 hover:scale-110 transition duration-500"
          />
        </div>

        {/* ===== CENTER BRAND NAME ===== */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-wider">
            <span className="text-yellow-400">M/S Maa Sita Enterprises</span>{" "}
           
          </h1>
        </div>

        {/* ===== RIGHT LINKS ===== */}
        <div className="space-x-6 hidden md:flex font-medium items-center relative">

          <Link
            to="/"
            className="flex items-center gap-1 hover:text-yellow-400 transition"
          >
            <FaHome /> Home
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-1 hover:text-yellow-400 transition"
          >
            <FaBox /> Products
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-yellow-400 transition"
          >
            <FaShoppingCart /> Cart
          </Link>

          <Link
            to="/notifications"
            className="flex items-center gap-1 hover:text-yellow-400 transition"
          >
            <IoNotifications /> Notifications
          </Link>

          {/* Profile Button */}
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-1 hover:text-yellow-400 transition"
          >
            <FaUser /> Profile
          </button>

          {/* ===== PROFILE MODAL ===== */}
          {showProfile && (
            <div className="absolute right-0 top-12 bg-white text-black w-72 rounded-xl shadow-2xl p-5 z-50">

              {!isLoggedIn ? (
                <>
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    Welcome 👋
                  </h3>

                  <Link
                    to="/login"
                    onClick={() => setShowProfile(false)}
                    className="block w-full bg-green-600 text-white text-center py-2 rounded mb-3 hover:bg-green-800 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setShowProfile(false)}
                    className="block w-full bg-yellow-500 text-white text-center py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  {/* Profile Pic + Email */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={profileImage || "https://i.pravatar.cc/100"}
                      alt="profile"
                      className="w-14 h-14 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-sm break-all">
                        {email}
                      </p>
                    </div>
                  </div>

                  {/* Buttons Parallel */}
                  <div className="flex gap-2">
                    <Link
                      to="/profile"
                      className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 flex justify-center items-center gap-1 transition"
                    >
                      <FaUser /> Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-700 flex justify-center items-center gap-1 transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;