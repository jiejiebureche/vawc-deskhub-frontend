import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RoleRedirect() {
  const { user } = useContext(AuthContext)

  if (!user) return <Navigate to="/login" replace />;

  if (user?.safeUser?.role === "agent") return <Navigate to="/dashboard" replace />;
  if (user?.safeUser?.role === "user") return <Navigate to="/home" replace />;

  return <Navigate to="/unauthorized" replace />;
}

