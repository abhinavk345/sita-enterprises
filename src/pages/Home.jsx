import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import crouselImage1 from "../images/farming.jpg";
import crouselImage2 from "../images/balu-gitti.jpg";
import crouselImage3 from "../images/khadbeej.jpg";
import crouselImage4 from "../images/pesticide.jpg";
import crouselImage5 from "../images/cement.jpg";
import crouselImage6 from "../images/poster1.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../pages/Cart";
import TractorForm from "../components/TractorForm";
import EnquiryForm from "./EnquiryForm";
import ProductSelector from "./ProductSelector";
import BigModal from "../components/common/BigModal";

function Home() {
const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);
  /* ================= CART STATE ================= */
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  /* ================= FEATURED PRODUCTS DATA ================= */
  const featuredProducts = [
    {
      id: 1,
      name: "Urea Fertilizer",
      price: 266,
      image: crouselImage3,
      available: true,
    },
    {
      id: 2,
      name: "Hybrid Wheat Seeds",
      price: 1200,
      image: crouselImage1,
      available: true,
    },
    {
      id: 3,
      name: "Cement Bag",
      price: 420,
      image: crouselImage5,
      available: true,
    },
    {
      id: 4,
      name: "Iron Rod 10mm",
      price: 600,
      image: crouselImage2,
      available: true,
    },
  ];

  return (
    <div className="overflow-hidden">

      {/* ================= HERO CAROUSEL ================= */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows
        interval={3500}
        transitionTime={900}
        swipeable
        emulateTouch
      >
        {[crouselImage1, crouselImage3, crouselImage4, crouselImage5, crouselImage6].map(
          (img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt="Slide"
                className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">
                  <span className="text-yellow-400">
                    Maa Sita
                  </span>{" "}
                  Enterprises
                </h1>

                <p className="mt-4 text-lg md:text-2xl text-gray-200">
                  Fertilizers | Seeds | Cement | Iron Rod
                </p>

                <Link to="/products">
                  <button className="mt-6 bg-green-600 hover:bg-green-800 px-6 py-3 rounded-lg text-lg shadow-lg hover:scale-110 transition">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          )
        )}
      </Carousel>

      {/* ================= FEATURED PRODUCTS ================= */}
      <div className="p-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
          Featured Products
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 flex-1">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

          {/* CART SIDE PANEL */}
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </div>
      </div>

{/* ================= WHY CHOOSE US ================= */}
      <div className="bg-green-800 text-white p-14 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Why Choose Maa Sita Enterprises?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl">✔ Best Prices</h3>
            <p className="mt-2">
              Affordable rates for farmers & builders
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xl">✔ Quality Products</h3>
            <p className="mt-2">
              Trusted brands and original materials
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xl">✔ Fast Delivery</h3>
            <p className="mt-2">
              Tractor & local delivery available
            </p>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-yellow-800 text-white p-14 text-center">
        <h2 className="text-3xl font-bold mb-10">
         Our Services
        </h2>

  

                  <div className="grid md:grid-cols-3 gap-8">
            <div className="enquiry-btn" onClick={() => openModal("tractor")}>
              <h3 className="font-bold text-xl">✔ Book Tractor Online</h3>
              <p className="mt-2">Book tractor with affordable price</p>
            </div>

            <div className="enquiry-btn" onClick={() => openModal("products")}>
              <h3 className="font-bold text-xl">✔ Our All Products</h3>
              <p className="mt-2">Choose branded and original materials</p>
            </div>

            <div className="enquiry-btn" onClick={() => openModal("enquiry")}>
              <h3 className="font-bold text-xl">✔ Enquiry Here</h3>
              <p className="mt-2">Your problem our solutions.</p>
            </div>
</div>
 {/* Modal Section */}
      <BigModal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === "tractor" && <TractorForm />}
        {modalType === "products" && <ProductSelector />}
        {modalType === "enquiry" && <EnquiryForm/>}
      </BigModal>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="bg-gray-900 text-white p-8 text-center">
        <h3 className="text-xl font-bold">M/S Maa Sita Enterprises</h3>
        <p>Fertilizer | Seeds | Cement | Iron Rod | Sand</p>
         
        <p className="mt-2">
          📞 +91 7368963831 | +91 8292756850 | +91 9470617063
        </p>
        <p className="mt-2">
          Email: khadbeejsitaenterprises@gmail.com
        </p>
        <p className="mt-4 text-gray-400">
          © 2026 Developed by Abhinav Kumar
       </p>
      </div>

    </div>
  );
}

export default Home;