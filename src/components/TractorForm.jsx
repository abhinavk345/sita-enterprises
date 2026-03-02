import { useState } from "react";
import "../styles/Forms.css";

const TractorForm = () => {
  const [paymentType, setPaymentType] = useState("");

  return (
    <form className="space-y-5">
      <h2 className="text-2xl font-bold text-center mb-4">
        🚜 Book Tractor
      </h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Full Name"
        required
        className="input-style"
      />

      {/* Address */}
      <input
        type="text"
        placeholder="Address"
        required
        className="input-style"
      />

      {/* Mobile */}
      <input
        type="tel"
        placeholder="Mobile Number"
        required
        className="input-style"
      />

      {/* Date */}
      <input
        type="date"
        required
        className="input-style"
      />

      {/* Time */}
      <input
        type="time"
        required
        className="input-style"
      />

      {/* Payment Option */}
      <div className="flex items-center gap-6 mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="paynow"
            checked={paymentType === "paynow"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          Pay Now
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="paylater"
            checked={paymentType === "paylater"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          Pay Later
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="primary-btn w-full mt-4"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default TractorForm;