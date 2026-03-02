import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [invoiceUrl, setInvoiceUrl] = useState("");     // ✅ added
  const [customerPhone, setCustomerPhone] = useState(""); // ✅ added

  const navigate = useNavigate();

  const shareOnWhatsAppToNumber = (invoiceUrl, phone) => {
    if (!invoiceUrl || !phone) {
      toast.error("Invoice or phone number missing");
      return;
    }

    const msg = `Your invoice from Sita Enterprises 🧾\nDownload: ${window.location.origin}${invoiceUrl}`;
    const waUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
    //window.open(waUrl, "_blank");
  };

  const handlePlaceOrder = async () => {
    try {
      const email = localStorage.getItem("loggedInUser");

      const res = await axios.post("http://localhost:8080/api/order/place", {
        email,
        paymentMethod,
        customerPhone, // send phone to backend if you want to save it
      });

      setOrderId(res.data.orderId);
      setInvoiceUrl(res.data.invoiceUrl);   // ✅ save invoice url
      setOrderSuccess(true);

      window.open(res.data.invoiceUrl, "_blank"); // auto open invoice
      toast.success("Order placed successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Order Failed ❌");
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md w-full">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            🎉 Thank You!
          </h2>

          <p className="text-lg mb-2">
            Your order has been placed successfully.
          </p>

          <p className="font-semibold mb-6">
            Order ID: <span className="text-green-700">{orderId}</span>
          </p>

          <div className="flex flex-col gap-3 justify-center">
            <button
              onClick={() => window.open(invoiceUrl, "_blank")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Download Invoice PDF
            </button>

            <button
              onClick={() => shareOnWhatsAppToNumber(invoiceUrl, customerPhone)}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Send Invoice on WhatsApp
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Customer Phone Input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Customer WhatsApp Number</label>
        <input
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="block">
          <input
            type="radio"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="ml-2">Online Payment</span>
        </label>

        <label className="block mt-2">
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="ml-2">Cash on Delivery</span>
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-900 transition"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;