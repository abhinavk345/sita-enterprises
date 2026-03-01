function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-4 text-center">

      {/* Product Image */}
      <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Product Name */}
      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        {product.name}
      </h3>

      {/* Price */}
      <p className="text-green-700 font-bold text-xl mt-2">
        ₹ {product.price}
      </p>

      {/* Availability */}
      <p
        className={`mt-2 font-medium ${
          product.available ? "text-green-600" : "text-red-500"
        }`}
      >
        {product.available ? "In Stock" : "Out of Stock"}
      </p>

      {/* Add To Cart Button */}
      <button
        onClick={() => addToCart(product)}
        disabled={!product.available}
        className={`mt-4 px-4 py-2 rounded-lg w-full transition duration-300
          ${
            product.available
              ? "bg-green-700 hover:bg-green-800 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
      >
        {product.available ? "Add to Cart" : "Not Available"}
      </button>

    </div>
  );
}

export default ProductCard;