import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const [contact_num, setContactNum] = useState("");
  const [password, setUserPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(contact_num, password);
  };

  return (
    <>
      {/* Main Container with Background and Overlay */}
      <div className="montserrat-font flex min-h-screen w-full bg-[url(./assets/login-bg.jpg)] bg-cover bg-center bg-no-repeat items-center justify-center relative px-4">
        {/* 🔹 Purple Overlay (Applied to match SignUp) */}
        <div className="absolute inset-0 bg-[#260026]/40"></div>

        {/* 🔹 Form Container */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-md flex flex-col bg-white rounded-xl shadow-2xl p-8 sm:p-10 items-center"
        >
          {/* Header */}
          <h2 className="text-2xl font-bold text-[#260026] mb-2">Login</h2>
          
          <div className="flex flex-row text-sm text-gray-600 mb-6">
            <p>Don't have an account?&nbsp;</p>
            <Link to="/signup" className="text-[#260026] font-semibold hover:underline">
              Sign up
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full mb-6">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-4 text-gray-400 font-medium text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Input Fields Container */}
          <div className="flex flex-col w-full space-y-4">
            
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
              <input
                placeholder="Contact Number"
                className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#260026] focus:ring-1 focus:ring-[#260026]"
                type="text"
                onChange={(e) => setContactNum(e.target.value)}
                value={contact_num}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                placeholder="Password"
                className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#260026] focus:ring-1 focus:ring-[#260026]"
                type="password"
                onChange={(e) => setUserPassword(e.target.value)}
                value={password}
              />
              {/* REMOVED "Forgot Password?" LINK */}
            </div>

          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            className="mt-8 bg-[#260026] rounded-full w-full py-3 text-white font-semibold shadow-md hover:bg-[#3b003b] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 w-full bg-red-50 text-red-600 border border-red-200 rounded text-sm text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default LoginForm;