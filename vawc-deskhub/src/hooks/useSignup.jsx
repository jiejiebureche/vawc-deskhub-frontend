import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const signup = async (
    name,
    dob,
    city,
    barangayComplainant,
    contact_num,
    password,
    valid_id
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("dob", dob);
      formData.append("city", city);
      formData.append("barangayComplainant", barangayComplainant);
      formData.append("contact_num", contact_num);
      formData.append("password", password);
      formData.append("role", "user");
      formData.append("valid_id", valid_id); 

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        body: formData, 
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Signup failed");
      }
      // localStorage.setItem("user", JSON.stringify(json));
      alert("Profile updated successfully!");
      dispatch({ type: "LOGIN", payload: json });
      navigate("/login")
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
