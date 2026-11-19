import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ureaImg from "../images/pesticide.jpg";
import cementImg from "../images/cement.jpg";
import ironImg from "../images/ironrod.jpg";
import seedImg from "../images/khadbeej.jpg";

function Products() {
  const role = localStorage.getItem("role"); // admin or user

  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load initial products
  useEffect(() => {
    const productList = [
      {
        id: 1,
        name: "Urea Fertilizer",
        price: 266,
        available: true,
        image: ureaImg,
      },
      {
        id: 2,
        name: "Hybrid Wheat Seeds",
        price: 1200,
        available: true,
        image: seedImg,
      },
      {
        id: 3,
        name: "Cement Bag",
        price: 420,
        available: true,
        image: cementImg,
      },
      {
        id: 4,
        name: "Iron Rod 10mm",
        price: 600,
        available: false,
        image: ironImg,
      },
    ];

    setProducts(productList);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  // ✅ Add to Cart (Only User)
  const addToCart = (product) => {
    if (role !== "USER") {
      alert("Only users can add to cart ❌");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);

    alert(`${product.name} added to cart ✅`);
  };

  // ✅ Admin Add Product
  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: "New Product",
      price: 100,
      available: true,
      image: ureaImg,
    };

    setProducts([...products, newProduct]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">
          Our Products
        </h2>

        {/* ✅ Show Only For Admin */}
        {role === "ADMIN" && (
          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            + Add Product
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            addToCart={addToCart}
            role={role}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;