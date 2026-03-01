import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("loggedInUser");

  const [profile, setProfile] = useState({
    name: "",
    contact: "",
    address: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/profile?email=${email}`)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, [email]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, profileImage: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      // redirect after 1.5 sec
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Update Profile
        </h2>

        <div className="text-center mb-6">
          <img
            src={profile.profileImage || "https://i.pravatar.cc/150"}
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

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={profile.contact}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={profile.address}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <button
          disabled={loading}
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-900 transition flex justify-center items-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
}

export default Profile;