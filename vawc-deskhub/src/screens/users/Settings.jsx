import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { PencilIcon, KeyIcon } from "@heroicons/react/24/solid";
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
      const updatedUserInStorage = { ...currentUser, safeUser: updatedSafeUser };

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
    setIsEditing(false);
    setFormData(safeUser);
  };

  return (
    <div className="montserrat-font flex min-h-screen bg-gray-50">
      
      {/* Sidebar with Peer fix */}
      <div className="peer h-full shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative bg-white overflow-auto ml-20 peer-hover:ml-64 transition-all duration-300 ease-in-out">
        
        {/* Header Image */}
        <div className="relative h-48 md:h-56 flex justify-center items-center z-0">
          <div className="absolute inset-0 bg-gray-800">
             <img
                src={bgUrl}
                alt="Header Background"
                className="w-full h-full object-cover opacity-60"
             />
          </div>
          <h1 className="relative z-10 text-white text-3xl md:text-4xl font-bold drop-shadow-lg tracking-wide -translate-y-4">
            Settings
          </h1>
        </div>

        {/* Profile Card Container */}
        <div className="px-4 pb-12">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 -mt-20 relative z-20">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6 gap-6 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-5">
                    <img
                        src="https://avatar.iran.liara.run/public/boy"
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                        {safeUser.name}
                        </h2>
                        <p className="text-gray-500 font-medium">{safeUser.contact_num}</p>
                    </div>
                </div>

                {/* Edit Actions */}
                <div className="flex items-center gap-3">
                {isEditing ? (
                    <>
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors border border-gray-200 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 shadow-md transition-all active:scale-95 text-sm"
                    >
                        Save
                    </button>
                    </>
                ) : (
                    <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-[#5b1b6f] text-white font-medium py-2 px-5 rounded-lg hover:bg-[#4a155a] shadow-md transition-all active:scale-95 text-sm"
                    >
                    <PencilIcon className="w-4 h-4" />
                    Edit Profile
                    </button>
                )}
                </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div className="group/input">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg px-4 py-2.5 outline-none transition-all ${
                        isEditing 
                            ? "bg-white border-purple-200 focus:border-[#5b1b6f] focus:ring-2 focus:ring-purple-50" 
                            : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    />
                </div>

                <div className="group/input">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        name="contact_num"
                        value={formData.contact_num}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg px-4 py-2.5 outline-none transition-all ${
                        isEditing 
                            ? "bg-white border-purple-200 focus:border-[#5b1b6f] focus:ring-2 focus:ring-purple-50" 
                            : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    />
                </div>

                <div className="group/input">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Barangay
                    </label>
                    <input
                        type="text"
                        name="barangayComplainant"
                        value={formData.barangayComplainant}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg px-4 py-2.5 outline-none transition-all ${
                        isEditing 
                            ? "bg-white border-purple-200 focus:border-[#5b1b6f] focus:ring-2 focus:ring-purple-50" 
                            : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    />
                </div>

                <div className="group/input">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg px-4 py-2.5 outline-none transition-all ${
                        isEditing 
                            ? "bg-white border-purple-200 focus:border-[#5b1b6f] focus:ring-2 focus:ring-purple-50" 
                            : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    />
                </div>

                <div className="group/input">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Gender
                    </label>
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender || ""}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg px-4 py-2.5 outline-none transition-all ${
                        isEditing 
                            ? "bg-white border-purple-200 focus:border-[#5b1b6f] focus:ring-2 focus:ring-purple-50" 
                            : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    />
                </div>
            </div>

            {/* Change Password - Below inputs, Compact */}
            <div className="mt-6 pt-5 border-t border-gray-100">
                <button
                    onClick={() => navigate("/change-password")}
                    className="flex items-center gap-2 text-[#5b1b6f] font-semibold hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors text-sm border border-transparent hover:border-purple-100"
                >
                    <KeyIcon className="w-5 h-5" />
                    Change Password
                </button>
            </div>
            
            </div>
        </div>
      </main>
    </div>
  );
}