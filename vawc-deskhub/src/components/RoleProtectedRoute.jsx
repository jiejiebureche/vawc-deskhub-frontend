import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user || !user?.token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.safeUser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
