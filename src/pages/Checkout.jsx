import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/order/place",
        {
          paymentMethod
        }
      );

      toast.success("Order Placed Successfully ✅");

    } catch (error) {
      toast.error("Order Failed ❌");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Payment Options */}
      <div className="mb-4">
        <label className="block">
          <input
            type="radio"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Online Payment
        </label>

        <label className="block mt-2">
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-700 text-white px-6 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;