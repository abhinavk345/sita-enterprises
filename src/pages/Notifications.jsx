import { useEffect, useState } from "react";

function Notifications() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const email = localStorage.getItem("loggedInUser");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isLoggedIn && email) {
      fetch(`http://localhost:8080/api/notifications?email=${email}`)
        .then(res => res.json())
        .then(data => setNotifications(data))
        .catch(() => setNotifications([]));
    }
  }, [isLoggedIn, email]);

  if (!isLoggedIn) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No Notifications</h2>
        <p className="text-gray-500 mt-2">
          Please login to see your notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((n, i) => (
          <div key={i} className="p-3 bg-white shadow rounded mb-2">
            {n.message}
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;