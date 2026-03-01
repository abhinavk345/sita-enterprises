import ProductCard from "../components/ProductCard";

const agricultureProducts = [
  {
    id: 1,
    name: "Urea Fertilizer",
    price: 266,
    image: "/images/urea.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Hybrid Wheat Seeds",
    price: 1450,
    image: "/images/seeds.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Organic Pesticide",
    price: 890,
    image: "/images/pesticide.jpg",
    available: false,
  },
];

function Agriculture() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-green-800">
        Agriculture Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {agricultureProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Agriculture;