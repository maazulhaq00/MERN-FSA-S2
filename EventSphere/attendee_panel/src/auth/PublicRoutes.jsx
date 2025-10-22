// src/components/PublicRoute.js
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role === "attendee") {
    return <Navigate to="/" />;
  }

  if (role === "organizer") {
    return <Navigate to="/organizer/panel" />;
  }

  if (role === "exhibitor") {
    return <Navigate to="/exhibitor/panel" />;
  }

  return children; 
}

export default PublicRoute;
