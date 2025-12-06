import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useSignup } from "../hooks/useSignup";

const SignUpForm = () => {
  const [contact_num, setContactNum] = useState("");
  const [name, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const [dob, setDOB] = useState("");
  const [city, setCity] = useState("");
  const [barangayComplainant, setBarangay] = useState("");
  const [valid_id, setUserId] = useState(null);
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(
      name,
      dob,
      city,
      barangayComplainant,
      contact_num,
      password,
      valid_id
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setUserId(file);
    } else {
      alert("Please upload a valid image file (JPG, JPEG, or PNG).");
      e.target.value = "";
    }
  };

  return (
    // Changed flex-col to flex-col-reverse on mobile so image is at bottom, form at top.
    // On Desktop (md:), it's a row with the form on the left.
    <div className="montserrat-font flex flex-col-reverse md:flex-row min-h-screen w-full bg-white">
      
      {/* Left Side (Form Container) */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-6 md:p-12 overflow-y-auto">
        
        <form
          onSubmit={handleSignup}
          className="w-full max-w-lg flex flex-col items-center bg-white"
        >
          {/* Header Section */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#260026]">
              Welcome to <span className="libre-baskerville-regular-italic font-bold">VAWC DeskHub!</span>
            </h2>
            <div className="flex flex-row items-center justify-center text-sm mt-2 text-gray-600">
              <p>Already have an account?&nbsp;</p>
              <Link to="/login" className="text-[#260026] font-semibold hover:underline">
                Log in
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="flex flex-row items-center justify-center w-full mb-6">
            <hr className="border-gray-300 border-t w-full" />
            <span className="mx-4 text-gray-400 font-medium">OR</span>
            <hr className="border-gray-300 border-t w-full" />
          </div>

          {/* Input Fields Container */}
          <div className="w-full space-y-4">
            
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                placeholder="Full Name"
                className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#260026] focus:ring-1 focus:ring-[#260026]"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={name}
              />
            </div>

            {/* Grid Row: Contact & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                <input
                  placeholder="09XXXXXXXXX"
                  className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#260026]"
                  type="text"
                  onChange={(e) => setContactNum(e.target.value)}
                  value={contact_num}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                <input
                  className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#260026]"
                  type="date"
                  onChange={(e) => setDOB(e.target.value)}
                  value={dob}
                />
              </div>
            </div>

            {/* Grid Row: City & Barangay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">City</label>
                <input
                  placeholder="City"
                  className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#260026]"
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Barangay</label>
                <input
                  placeholder="Barangay"
                  className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#260026]"
                  type="text"
                  onChange={(e) => setBarangay(e.target.value)}
                  value={barangayComplainant}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                placeholder="Password"
                className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#260026]"
                type="password"
                onChange={(e) => setUserPassword(e.target.value)}
                value={password}
              />
            </div>

            {/* Upload Valid ID */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Valid ID</label>
              <label className="flex items-center justify-center gap-2 border border-gray-300 border-dashed rounded-lg py-3 cursor-pointer hover:bg-gray-50 hover:border-[#260026] transition">
                <ArrowUpTrayIcon className="w-5 h-5 text-[#260026]" />
                <span className="text-sm text-gray-600 truncate max-w-[200px]">
                  {valid_id ? valid_id.name : "Upload Valid ID"}
                </span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            className="mt-8 bg-[#260026] rounded-full w-full py-3 text-white font-semibold shadow-md hover:bg-[#3b003b] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          {error && (
            <div className="mt-4 p-3 w-full bg-red-50 text-red-600 border border-red-200 rounded text-sm text-center">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Right Side (Background Image with Overlay) */}
      {/* Added relative and the overlay div */}
      <div className="relative h-48 md:h-auto w-full md:w-1/2 bg-[url(./assets/signup-bg.jpg)] bg-cover bg-center bg-no-repeat flex-shrink-0">
          {/* 🔹 Purple Overlay (Applied here) */}
         <div className="absolute inset-0 bg-[#260026]/40"></div>
      </div>
    </div>
  );
};

export default SignUpForm;