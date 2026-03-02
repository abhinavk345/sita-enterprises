import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("loggedInUser");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [profile, setProfile] = useState({
    name: "",
    contact: "",
    address: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ If not logged in → redirect safely
  useEffect(() => {
    if (!isLoggedIn || !email) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/api/user/profile?email=${email}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => toast.error("Failed to load profile"));
  }, [email, isLoggedIn, navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    if (!e.target.files[0]) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, profileImage: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/profile?email=${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        }
      );

      setLoading(false);

      if (response.ok) {
        toast.success("Profile Updated Successfully ✅");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Something went wrong ❌");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
      >
        {/* ✅ Top Cancel Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Update Profile
        </h2>

        {/* ✅ Profile Image Section */}
        <div className="text-center mb-6">
          <img
            src={
              profile.profileImage
                ? profile.profileImage
                : "/images/default-profile.png"
            }
            alt="profile"
            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-green-600"
          />

          <input
            type="file"
            className="mt-3"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={profile.contact}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={profile.address}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* ✅ Bottom Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900 transition flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;