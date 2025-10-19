import React from "react";
import Sidebar from "../../components/Sidebar";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const bgUrl = new URL("/src/assets/banner-bg.jpg", import.meta.url).href;

export default function Settings() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)

  const safeUser = user?.safeUser

  return (
    <div className="montserrat-font flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 relative bg-white overflow-auto">
        {/* Header Image */}
        <div className="relative h-48 rounded-b-lg flex justify-center items-center">
          <img
            src={bgUrl}
            alt="Header Background"
            className="absolute inset-0 w-full h-full object-cover rounded-b-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-b-lg"></div>
          <p className="relative z-10 text-white text-lg font-semibold drop-shadow">
            Settings
          </p>
        </div>

        {/* Profile Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 -mt-16 relative z-10 m-8">
          <div className="flex justify-between items-start mb-8">
            {/* Profile Info */}
            <div className="flex items-center space-x-4">
              <img
                src="https://avatar.iran.liara.run/public/boy"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {safeUser.name}
                </h2>
                <p className="text-gray-500">{safeUser.contact_num}</p>
              </div>
            </div>

            {/* Edit Button */}
            <button className="flex items-center gap-2 bg-purple-900 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-800 transition">
              <PencilIcon className="w-5 h-5" />
              Edit
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={safeUser.name}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Contact Num
              </label>
              <input
                type="text"
                value={safeUser.contact_num}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Barangay
              </label>
              <input
                type="text"
                value={safeUser.barangayComplainant}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                City
              </label>
              <input
                type="text"
                value={safeUser.city}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <input
                type="text"
                value={safeUser.gender || ""}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
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
