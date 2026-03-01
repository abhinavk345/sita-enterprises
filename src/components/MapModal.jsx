import React from "react";

function MapModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      
      {/* Modal Box */}
      <div className="bg-white w-[95%] md:w-[800px] h-[500px] rounded-xl shadow-2xl relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-600 hover:text-red-600"
        >
          ✕
        </button>

        {/* Google Map Iframe */}
        <iframe
          title="Maa Sita Enterprises Location"
          src="https://www.google.com/maps?q=26.000385317794468, 86.40910641375831&z=15&output=embed"
          width="100%"
          height="100%"
          style={{ borderRadius: "12px" }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default MapModal;