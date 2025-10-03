import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    //post user code here
  };

  return (
    <>
      <div className="montserrat-font flex flex-col md:flex-row w-screen h-screen">
        <div className="h-1/3 md:h-full w-1/2">
          <div className="flex h-full md:h-full w-screen lg:w-full bg-[url(./assets/signup-bg.jpg)] bg-cover bg-center bg-no-repeat"></div>
        </div>
        <div className="flex flex-col bg-white h-full w-full md:h-full w-1/2 items-center justify-center">
          <form
            onSubmit={handleSignup}
            className="login-form flex flex-col bg-white mt-3 w-full h-full rounded-[10px] text-[2.2vh] items-center justify-center-safe"
          >
            <p className="form-title mt-0 text-xl font-bold text-[#260026]">
              Welcome to VAWC DeskHub!
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
              {/* gap-4 keeps spacing consistent between all fields */}

              <div className="flex flex-col">
                <label className="field-label text-left mb-1">Name</label>
                <input
                  placeholder="Name"
                  className="h-10 p-2 border border-gray-300 rounded-[7px]"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
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
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setAge(e.target.value)}
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
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="field-label text-left mb-1">Barangay</label>
                  <input
                    placeholder="Barangay"
                    className="h-10 p-2 border border-gray-300 rounded-[7px]"
                    type="text"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="field-label text-left mb-1">Password</label>
                <input
                  placeholder="Password"
                  className="h-10 p-2 border border-gray-300 rounded-[7px]"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              className="mt-6 bg-[#260026] rounded-full w-2/3 text-white py-2"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
