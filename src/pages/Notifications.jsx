import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("loggedInUser");

    axios.get(`http://localhost:8080/api/order/user?email=${email}`)
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {orders.map(order => (
        <div key={order.id} className="bg-white p-4 shadow rounded mb-3">
          Order #{order.id} - {order.status}
        </div>
      ))}
    </div>
  );
}

export default Notifications;