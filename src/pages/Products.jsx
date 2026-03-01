import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ureaImg from "../images/pesticide.jpg";
import cementImg from "../images/cement.jpg";
import ironImg from "../images/ironrod.jpg";
import seedImg from "../images/khadbeej.jpg";

function Products() {
  const [cartCount, setCartCount] = useState(0);

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

  const addToCart = (product) => {
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

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Our Products
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {productList.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            addToCart={addToCart}
          />
        ))}
      </div>

    </div>
  );
}

export default Products;