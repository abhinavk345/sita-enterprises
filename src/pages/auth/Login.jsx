import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpType, setOtpType] = useState("email"); // email or mobile
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email || !password) {
      toast.error("Email & Password required ❌");
      return;
    }

    try {
      setSendingOtp(true);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/send-otp`,
        { email, password, type: otpType }
      );

      toast.success("OTP Sent Successfully ✅");
      setOtpSent(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password ❌"
      );
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP ❌");
      return;
    }

    try {
      setVerifyingOtp(true);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`,
        { email, otp }
      );

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", email);

      toast.success("Login Successful ✅");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP ❌");
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <form
        onSubmit={handleVerifyOtp}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Login with OTP
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 🔘 OTP TYPE RADIO */}
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              value="email"
              checked={otpType === "email"}
              onChange={() => setOtpType("email")}
            />
            <span className="ml-2">Email OTP</span>
          </label>

          <label>
            <input
              type="radio"
              value="mobile"
              checked={otpType === "mobile"}
              onChange={() => setOtpType("mobile")}
            />
            <span className="ml-2">Mobile OTP</span>
          </label>
        </div>

        {!otpSent ? (
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={sendingOtp}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-800 transition flex justify-center items-center"
          >
            {sendingOtp ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send OTP"
            )}
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 border rounded mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              disabled={verifyingOtp}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-800 transition flex justify-center items-center"
            >
              {verifyingOtp ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify & Login"
              )}
            </button>
          </>
        )}

        <p className="text-center mt-4">
          Don’t have account?{" "}
          <Link to="/signup" className="text-green-600 font-bold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;