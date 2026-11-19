import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import FloatingMenu from "./components/FloatingMenu";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import MapModal from "./components/MapModal";
import Agriculture from "./pages/Agriculture";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "./pages/Notifications";

function App() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">

        <Navbar />

        <div className="flex-grow pt-16 pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route  path="/dashboard" element={<ProtectedRoute roleRequired="ADMIN"> <Dashboard /></ProtectedRoute>} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          </Routes>
        </div>

        {/* Bottom Navigation for Mobile */}
        <BottomNav />

        {/* Floating Circular Action Menu */}
        <FloatingMenu onMapClick={() => setIsMapOpen(true)} />

        <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </BrowserRouter>
  );
}

export default App;