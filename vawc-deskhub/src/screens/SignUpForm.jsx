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

    // post user code here

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
    <>
      <div className="montserrat-font flex flex-col md:flex-row w-screen h-screen">
        {/* Left Side (Background Image) */}
        <div className="h-1/3 md:h-full w-full md:w-1/2 bg-[url(./assets/signup-bg.jpg)] bg-cover bg-center bg-no-repeat"></div>

        {/* Right Side (Form) */}
        <div className="flex flex-col bg-white h-full w-full md:w-1/2 items-center justify-center">
          <form
            onSubmit={handleSignup}
            className="login-form flex flex-col bg-white mt-3 w-full h-full rounded-[10px] text-[2.2vh] items-center justify-center-safe"
          >
            <p className="form-title mt-0 text-xl font-bold text-[#260026]">
              Welcome to <span className="libre-baskerville-regular-italic font-bold">VAWC DeskHub!</span>
            </p>
            <div className="flex flex-row text-xs mb-4">
              <p className="form-text">Already have an account?&nbsp;</p>
              <Link to="/login" className="form-text">
                Log in
              </Link>
            </div>
            <div className="flex flex-row items-center justify-center w-full mb-6">
              <hr className="border-gray-300 border-t-2 w-full mx-7" />
              <p className="form-title text-xl text-gray-400">OR</p>
              <hr className="border-gray-300 border-t-2 w-full mx-7" />
            </div>

            <div className="flex flex-col w-2/3 gap-4">
              {/* Input Fields */}
              <div className="flex flex-col">
                <label className="field-label text-left mb-1">Name</label>
                <input
                  placeholder="Name"
                  className="h-10 p-2 border border-gray-300 rounded-[7px]"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                  <label className="field-label text-left mb-1">
                    Contact Number
                  </label>
                  <input
                    placeholder="Contact Number"
                    className="h-10 p-2 border border-gray-300 rounded-[7px]"
                    type="text"
                    onChange={(e) => setContactNum(e.target.value)}
                    value={contact_num}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="field-label text-left mb-1">
                    Date of Birth
                  </label>
                  <input
                    placeholder="DOB"
                    className="h-10 p-2 border border-gray-300 rounded-[7px] text-sm"
                    type="date"
                    onChange={(e) => setDOB(e.target.value)}
                    value={dob}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                  <label className="field-label text-left mb-1">City</label>
                  <input
                    placeholder="City"
                    className="h-10 p-2 border border-gray-300 rounded-[7px]"
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="field-label text-left mb-1">Barangay</label>
                  <input
                    placeholder="Barangay"
                    className="h-10 p-2 border border-gray-300 rounded-[7px]"
                    type="text"
                    onChange={(e) => setBarangay(e.target.value)}
                    value={barangayComplainant}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="field-label text-left mb-1">Password</label>
                <input
                  placeholder="Password"
                  className="h-10 p-2 border border-gray-300 rounded-[7px]"
                  type="password"
                  onChange={(e) => setUserPassword(e.target.value)}
                  value={password}
                />
              </div>

              {/* Upload Valid ID */}
              <div className="flex flex-col">
                <label className="field-label text-left mb-1">Valid ID</label>
                <label className="flex items-center justify-center gap-2 border border-gray-300 rounded-[7px] py-2 cursor-pointer hover:bg-gray-100 transition">
                  <ArrowUpTrayIcon className="w-5 h-5 text-[#260026]" />
                  <span className="text-sm text-[#260026]">
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

            <button
              disabled={isLoading}
              className="mt-6 bg-[#260026] rounded-full w-2/3 text-white py-2 hover:bg-[#3b003b] transition-all"
              type="submit"
            >
              Sign Up
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
