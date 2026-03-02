import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Forms.css";

const ProductSelector = () => {
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Toggle checkbox using ID (Correct way)
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const addToCart = () => {
    const selectedProducts = products.filter((p) =>
      selectedIds.includes(p.id)
    );

    console.log("Selected Products:", selectedProducts);

    // 🔹 You can store in localStorage or global cart state here
    // localStorage.setItem("cart", JSON.stringify(selectedProducts));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">
        🛒 Select Products
      </h2>

      {loading && <p className="text-center">Loading products...</p>}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">
          No products available
        </p>
      )}

      <div className="max-h-60 overflow-y-auto space-y-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              {p.price && (
                <p className="text-sm text-gray-500">₹ {p.price}</p>
              )}
            </div>

            <input
              type="checkbox"
              checked={selectedIds.includes(p.id)}
              onChange={() => toggleSelect(p.id)}
              className="w-4 h-4"
            />
          </div>
        ))}
      </div>

      <button
        onClick={addToCart}
        disabled={selectedIds.length === 0}
        className={`primary-btn w-full ${
          selectedIds.length === 0
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Add To Cart ({selectedIds.length})
      </button>
    </div>
  );
};

export default ProductSelector;