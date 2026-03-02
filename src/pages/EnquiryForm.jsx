import { useState } from "react";
import toast from "react-hot-toast";
import "../styles/Forms.css";
const EnquiryForm = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please write your enquiry message");
      return;
    }

    try {
      setLoading(true);

      // 🔹 Call your backend API here
      // await axios.post("/api/enquiry", { message });

      toast.success("Enquiry sent successfully");
      setMessage(""); // Clear textarea
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-center mb-4">
        📩 Send Enquiry
      </h2>

      <textarea
        placeholder="Write your message..."
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input-style h-32 resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="primary-btn w-full"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default EnquiryForm;