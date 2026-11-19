import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Role based protection
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;