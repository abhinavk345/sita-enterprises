import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/logos/logo2F.png";
import { FaHome, FaShoppingCart, FaUser, FaBox, FaBars, FaTimes } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { toast } from "react-toastify";
import default_user from "../images/default_user.webp";
function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
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

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 
     ${isActive ? "bg-yellow-400 text-black shadow-lg scale-105" : "hover:bg-green-800"}`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-900 to-green-700 text-white shadow-xl z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">

        {/* ===== LEFT SECTION ===== */}
        <div className="flex items-center gap-4">

          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 object-contain hover:rotate-6 hover:scale-110 transition duration-500"
          />

          {/* Brand Name LEFT aligned with animation */}
          <h1 className="brand-text text-lg md:text-2xl font-extrabold tracking-wide">
            M/S Maa Sita Enterprises
          </h1>
        </div>

        {/* ===== DESKTOP NAV ===== */}
        <div className="hidden md:flex items-center gap-4 relative">

          <NavLink to="/" className={navLinkStyle}>
            <FaHome /> Home
          </NavLink>

          <NavLink to="/products" className={navLinkStyle}>
            <FaBox /> Products
          </NavLink>

          <NavLink to="/cart" className={navLinkStyle}>
            <FaShoppingCart /> Cart
          </NavLink>

          <NavLink to="/notifications" className={navLinkStyle}>
            <IoNotifications /> Notifications
          </NavLink>

          {/* Profile */}
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-800 transition"
          >
            <FaUser /> Profile
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-14 bg-white text-black w-72 rounded-xl shadow-2xl p-5 animate-fadeIn z-50">

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
                  <div className="flex items-center gap-3 mb-4">
                     <img
                      src={
                        profileImage
                          ? `http://localhost:8080/${profileImage}`
                          : default_user
                      }
                      alt="profile"
                      className="w-14 h-14 rounded-full object-cover border"
                    />
                    <p className="font-semibold text-sm break-all">
                      {email}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to="/profile"
                      className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 flex justify-center items-center gap-1 transition"
                    >
                      <FaUser /> Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ===== MOBILE MENU BUTTON ===== */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* ===== MOBILE NAV DROPDOWN ===== */}
      {mobileMenu && (
        <div className="md:hidden bg-green-800 px-4 py-4 space-y-3 animate-slideDown">

          <NavLink to="/" className={navLinkStyle} onClick={() => setMobileMenu(false)}>
            <FaHome /> Home
          </NavLink>

          <NavLink to="/products" className={navLinkStyle} onClick={() => setMobileMenu(false)}>
            <FaBox /> Products
          </NavLink>

          <NavLink to="/cart" className={navLinkStyle} onClick={() => setMobileMenu(false)}>
            <FaShoppingCart /> Cart
          </NavLink>

          <NavLink to="/notifications" className={navLinkStyle} onClick={() => setMobileMenu(false)}>
            <IoNotifications /> Notifications
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;