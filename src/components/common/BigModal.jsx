import { useEffect } from "react";


const BigModal = ({ isOpen, onClose, children }) => {

  // Disable body scroll + ESC key support
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn"
      onClick={onClose} // click outside closes modal
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl relative shadow-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default BigModal;