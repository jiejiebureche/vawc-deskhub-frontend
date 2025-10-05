import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("city", city);
    formData.append("barangayComplainant", barangayComplainant);
    formData.append("contact_num", contact_num);
    formData.append("password", password);
    formData.append("valid_id", valid_id);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Signup failed");
      } else {
        //save user to localstorage
        localStorage.setItem("user", JSON.stringify(json));

        //update context
        dispatch({ type: "LOGIN", payload: json });
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
