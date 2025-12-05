import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import {
  LockClosedIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const API_URL = import.meta.env.VITE_API_URL;

export default function ChangePassword() {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = {
    buttonPrimary: "bg-[#5b1b6f]",
    buttonHover: "hover:bg-[#4a155a]",
    inputBorder: "border-gray-300",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (
      !validator.isStrongPassword(newPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
      );
      return;
    }

    const userId = user?.safeUser?.id;

    if (!userId) {
      setError("User not found. Please log in again.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || json.error || "Failed to update password");
      }

      localStorage.setItem("user", JSON.stringify(json));

      if (dispatch) {
        dispatch({ type: "LOGIN", payload: json });
      }

      setSuccess("Password changed successfully!");
      e.currentTarget.reset(); // Clear form fields
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="peer h-full shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 relative bg-white overflow-auto ml-20 peer-hover:ml-64 transition-all duration-300 ease-in-out">
        <div className="h-48 w-full bg-gray-300 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="Banner"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        <div className="px-8 pb-12">
          <div className="max-w-2xl mx-auto -mt-24 relative z-10">
            <div className="bg-white rounded-xl shadow-xl p-10">
              <div className="flex flex-col items-center justify-center mb-8 border-b border-gray-100 pb-6 text-center">
                <div className="p-4 bg-purple-50 rounded-full mb-4 shadow-sm">
                  <LockClosedIcon className="text-[#5b1b6f] h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Change Password
                </h2>
                <p className="text-gray-500 mt-2">
                  Update your account security credentials below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                {error && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 text-red-700 text-sm animate-fadeIn">
                    <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-100 flex items-center gap-3 text-green-700 text-sm animate-fadeIn">
                    <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
                    <span>{success}</span>
                  </div>
                )}

                <div className="space-y-5">
                  <div className="group/input">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      name="newPassword"
                      type="password"
                      className={`w-full px-4 py-3 rounded-lg border ${theme.inputBorder} focus:border-[#5b1b6f] focus:ring-4 focus:ring-purple-50 outline-none transition-all bg-gray-50 focus:bg-white`}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="group/input">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className={`w-full px-4 py-3 rounded-lg border ${theme.inputBorder} focus:border-[#5b1b6f] focus:ring-4 focus:ring-purple-50 outline-none transition-all bg-gray-50 focus:bg-white`}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigate("/settings")}
                    className="px-8 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`${theme.buttonPrimary} ${theme.buttonHover} text-white px-10 py-3 rounded-lg font-semibold shadow-lg shadow-purple-100 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}