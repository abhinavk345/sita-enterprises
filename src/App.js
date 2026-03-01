import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import MapModal from "./components/MapModal";
import Agriculture from "./pages/Agriculture";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout";

function App() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/agriculture" element={<Agriculture />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      </Routes>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">

        <button
          onClick={() => setIsMapOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          Find On Map
        </button>

        <a
          href="https://wa.me/919470617063"
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          WhatsApp
        </a>

        <a
          href="tel:+919470617063"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Call
        </a>

        <a
          href="mailto:khadbeejsitaenterprises@gmail.com"
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Email
        </a>
      </div>

      {/* Map Modal */}
      <MapModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
      />
    <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;