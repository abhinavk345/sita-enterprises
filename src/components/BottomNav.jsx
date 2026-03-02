import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaBell, FaBoxOpen } from "react-icons/fa";

function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md md:hidden z-40">
      <div className="flex justify-around py-3 text-gray-600">

        <NavLink to="/" className="nav-icon">
          <FaHome size={22} />
        </NavLink>

        <NavLink to="/products" className="nav-icon">
          <FaBoxOpen size={22} />
        </NavLink>

        <NavLink to="/cart" className="nav-icon relative">
          <FaShoppingCart size={22} />
          <span className="badge">2</span>
        </NavLink>

        <NavLink to="/profile" className="nav-icon">
          <FaBell size={22} />
        </NavLink>

      </div>
    </div>
  );
}

export default BottomNav;