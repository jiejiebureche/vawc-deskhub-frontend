import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const bgUrl = new URL("/src/assets/banner-bg.jpg", import.meta.url).href;

export default function Settings() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const safeUser = currentUser?.safeUser;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(safeUser);
  // console.log(formData)
  const API_URL = import.meta.env.VITE_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const userId = safeUser.id || safeUser._id;

    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user.");
      }

      const updatedSafeUser = await response.json();

      const updatedUserInStorage = {
        ...currentUser,
        safeUser: updatedSafeUser,
      };

      localStorage.setItem("user", JSON.stringify(updatedUserInStorage));
      setCurrentUser(updatedUserInStorage);
      setFormData(updatedSafeUser);
      setIsEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCancel = () => {
    // 1. Exit edit mode
    setIsEditing(false);
    // 2. Reset the form data back to the original, saved data
    setFormData(safeUser);
  };

  return (
    <div className="montserrat-font flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 relative bg-white overflow-auto">
        {/* Header Image */}
        <div className="relative h-64 md:h-72 flex justify-center items-center z-0">
          <img
            src={bgUrl}
            alt="Header Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <p className="relative z-10 text-white text-2xl md:text-3xl font-semibold drop-shadow">
            Settings
          </p>
        </div>

        {/* Profile Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 -mt-16 relative z-20 m-8">
          <div className="flex justify-between items-start mb-8">
            {/* Profile Info */}
            <div className="flex items-center space-x-4">
              <img
                src="https://avatar.iran.liara.run/public/boy"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              />
              <div>
                {/* These will now update on save because they read from 'safeUser' */}
                <h2 className="text-2xl font-semibold text-gray-800">
                  {safeUser.name}
                </h2>
                <p className="text-gray-500">{safeUser.contact_num}</p>
              </div>
            </div>

            {/* 9. Conditional Edit/Save/Cancel Buttons */}
            <div className="flex items-center gap-2">
              {isEditing ? (
                // Show Save and Cancel buttons if we ARE editing
                <>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-500 transition"
                  >
                    Save
                  </button>
                </>
              ) : (
                // Show Edit button if we are NOT editing
                <button
                  onClick={() => setIsEditing(true)} // Click to enter edit mode
                  className="flex items-center gap-2 bg-purple-900 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-800 transition"
                >
                  <PencilIcon className="w-5 h-5" />
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* 10. Update Details Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name" // Add 'name' attribute
                value={formData.name} // Read from 'formData' state
                disabled={!isEditing} // Disable based on 'isEditing' state
                onChange={handleInputChange} // Call handler on change
                className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                  isEditing ? "bg-white" : "bg-gray-50" // Conditional styling
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Contact Num
              </label>
              <input
                type="text"
                name="contact_num" // Add 'name' attribute
                value={formData.contact_num} // Read from 'formData' state
                disabled={!isEditing} // Disable based on 'isEditing' state
                onChange={handleInputChange} // Call handler on change
                className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                  isEditing ? "bg-white" : "bg-gray-50"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Barangay
              </label>
              <input
                type="text"
                name="barangayComplainant" // Add 'name' attribute
                value={formData.barangayComplainant} // Read from 'formData' state
                disabled={!isEditing} // Disable based on 'isEditing' state
                onChange={handleInputChange} // Call handler on change
                className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                  isEditing ? "bg-white" : "bg-gray-50"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                City
              </label>
              <input
                type="text"
                name="city" // Add 'name' attribute
                value={formData.city} // Read from 'formData' state
                disabled={!isEditing} // Disable based on 'isEditing' state
                onChange={handleInputChange} // Call handler on change
                className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                  isEditing ? "bg-white" : "bg-gray-50"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <input
                type="text"
                name="gender" // Add 'name' attribute
                value={formData.gender || ""} // Read from 'formData' state
                disabled={!isEditing} // Disable based on 'isEditing' state
                onChange={handleInputChange} // Call handler on change
                className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                  isEditing ? "bg-white" : "bg-gray-50"
                }`}
              />
            </div>
          </div>

          {/* Change Password */}
          <div className="mt-10">
            <button
              onClick={() => navigate("/change-password")}
              className="bg-purple-900 text-white font-medium py-2 px-6 rounded-md hover:bg-purple-800 transition"
            >
              Change Password
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
