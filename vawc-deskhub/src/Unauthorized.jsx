import React from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleGoBack = () => {
    const role = user?.safeUser?.role;
    if (role === "user") {
      navigate("/");
    } else if (role === "agent") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="montserrat-font h-screen flex flex-col justify-center items-center text-center px-8">
      <LockClosedIcon className="w-20 h-20 text-gray-600 mx-auto" />
      <h1 className="mt-10 text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
        Unauthorized Access
      </h1>
      <p className="mt-8 mb-14 text-lg text-gray-500 max-w-sm mx-auto">
        You don&apos;t have permission to view this page.
      </p>
      <button
        onClick={handleGoBack}
        className="bg-gray-700 text-white font-medium py-2 px-6 rounded-md hover:bg-gray-800 transition w-full md:w-32"
      >
        Go Back
      </button>
    </div>
  );
}
