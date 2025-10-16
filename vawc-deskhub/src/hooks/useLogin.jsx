import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const login = async (contact_num, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact_num, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      const user = await json;
      if (user?.safeUser?.role === "user") {
        navigate("/");
      } else if (user?.safeUser?.role === "agent") {
        navigate("/dashboard");
      } else {
        console.error("You don't have access to this");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
