import { useState, useEffect, useRef } from "react";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";

function FloatingMenu({ onMapClick }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 160,
  });

  const isMobile = window.innerWidth < 768;

  const dragging = useRef(false);
  const moved = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  /* ======================= */
  /* Smooth Drag (Mobile)    */
  /* ======================= */

  const startDrag = (e) => {
    if (!isMobile) return;

    dragging.current = true;
    moved.current = false;

    const touch = e.touches[0];

    offset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  };

  const onDrag = (e) => {
    if (!dragging.current || !isMobile) return;

    moved.current = true;

    const touch = e.touches[0];

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      setPosition({
        x: touch.clientX - offset.current.x,
        y: touch.clientY - offset.current.y,
      });
    });
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("touchmove", onDrag, { passive: false });
    document.addEventListener("touchend", stopDrag);

    return () => {
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("touchend", stopDrag);
    };
  }, []);

  /* ======================= */
  /* Prevent click while drag */
  /* ======================= */

  const preventIfDragging = (e) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  /* ======================= */
  /* Toggle for Mobile Tap   */
  /* ======================= */

  const handleMobileClick = () => {
    if (isMobile && !moved.current) {
      setOpen((prev) => !prev);
    }
  };

  /* ======================= */

  return (
    <div
      style={{
        position: "fixed",
        left: isMobile ? position.x : "auto",
        top: isMobile ? position.y : "auto",
        right: !isMobile ? "24px" : "auto",
        bottom: !isMobile ? "100px" : "auto",
        zIndex: 9999,
      }}
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
    >
      <div className="relative flex flex-col items-center">

        {/* MAP */}
        <button
          onClick={() => {
            setOpen(false);
            onMapClick();
          }}
          className={`fab-item bg-yellow-500 transition-all duration-300 ${
            open ? "translate-y-[-80px] opacity-100" : "opacity-0"
          }`}
        >
          <FaMapMarkerAlt />
        </button>

        {/* EMAIL */}
        <a
          href="mailto:khadbeejsitaenterprises@gmail.com"
          onClick={preventIfDragging}
          className={`fab-item bg-red-500 transition-all duration-300 ${
            open ? "translate-y-[-150px] opacity-100" : "opacity-0"
          }`}
        >
          <FaEnvelope />
        </a>

        {/* CALL */}
        <a
          href="tel:+919470617063"
          onClick={preventIfDragging}
          className={`fab-item bg-blue-500 transition-all duration-300 ${
            open ? "translate-y-[-220px] opacity-100" : "opacity-0"
          }`}
        >
          <FaPhone />
        </a>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/919470617063"
          onClick={preventIfDragging}
          className={`fab-item bg-green-500 transition-all duration-300 ${
            open ? "translate-y-[-290px] opacity-100" : "opacity-0"
          }`}
        >
          <FaWhatsapp />
        </a>

        {/* MAIN BUTTON */}
        <button
          onTouchStart={startDrag}
          onClick={handleMobileClick}
          className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl transition-transform duration-300"
        >
          <FaPlus className={`${open ? "rotate-45" : ""} transition`} />
        </button>
      </div>
    </div>
  );
}

export default FloatingMenu;