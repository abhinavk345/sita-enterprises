import { useNavigate } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate(); // ✅ Initialize navigate

  // Increase quantity of a cart item
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity or remove item if quantity becomes 0
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate total price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-80 bg-white shadow-lg p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-4">🛒 Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3 border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ₹ {item.price} × {item.quantity}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 bg-green-600 text-white rounded hover:bg-green-800 transition"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 font-bold text-lg">Total: ₹ {total}</div>

          {/* ✅ Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-900 transition"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;