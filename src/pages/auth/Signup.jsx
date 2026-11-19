import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation: at least one of email or mobile must be provided
    if (!email && !contact) {
       toast.error("Please provide either Email or Mobile number ✅");
      return;
    }

    try {
      // Build request body dynamically
      const requestBody = {
        name,
        password,
        role,
        ...(email && { email }),
        ...(contact && { contact }),
      };

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Account Created Successfully ✅");
      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Registration Failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email <Optional>"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="MobileNo <Optional>"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setContact(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex gap-6 mt-3">
  <label>
    <input
      type="radio"
      value="USER"
      checked={role === "USER"}
      onChange={(e) => setRole(e.target.value)}
    />
    User
  </label>

  <label>
    <input
      type="radio"
      value="ADMIN"
      checked={role === "ADMIN"}
      onChange={(e) => setRole(e.target.value)}
    />
    Admin
  </label>
</div>

        <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-800 transition">
          Signup
        </button>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-green-600 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;