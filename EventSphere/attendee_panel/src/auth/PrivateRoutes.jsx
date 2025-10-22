// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const role = localStorage.getItem("role");
  

  if (!role) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
