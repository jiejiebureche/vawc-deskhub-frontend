// import VAWCLogo from "../assets/looped.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const [contact_num, setContactNum] = useState("");
  const [password, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    //fetch data code here here
  };

  return (
    <>
      <div className="montserrat-font flex h-screen w-screen bg-[url(./assets/login-bg.jpg)] bg-cover bg-center bg-no-repeat items-center justify-center relative">
        {/* 🔹 Overlay */}
        <div className="absolute inset-0 bg-[#260026]/40"></div>

        <form
          onSubmit={handleSubmit}
          className="login-form flex flex-col bg-white w-3/4 h-3/5 sm:w-3/5 sm:h-2/3 md:w-2/3 md:h-3/5 lg:w-1/3 lg:h-2/3 text-[2.2vh] rounded-[10px] items-center justify-center-safe relative z-10"
        >
          {/* <img src={LoopedDefault} alt="Looped Logo" className="size-15" /> */}
          <p className="form-title font-bold text-xl text-[#260026]">Login</p>
          <div className="flex flex-row text-xs">
            <p className="form-text">Don't have an account?&nbsp;</p>
            <Link to="/signup" className="form-text">
              Sign up
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center w-full">
            <hr className="my-8 border-gray-300 border-t-2 w-full mx-7" />
            <p className="form-title text-xl text-gray-400">OR</p>
            <hr className="my-8 border-gray-300 border-t-2 w-full mx-7" />
          </div>
          <div className="flex flex-col w-2/3">
            <label className="field-label text-left mb-1">Contact Number</label>
            <input
              placeholder="Contact Number"
              className="mt-1 p-2 border-1 border-solid border-gray-300 rounded-[7px]"
              type="text"
              onChange={(e) => setContactNum(e.target.value)}
              value={contact_num}
            />
            <label className="field-label text-left mt-5 mb-1">Password</label>
            <input
              placeholder="Password"
              className="mt-1 p-2 border-1 border-solid border-gray-300 rounded-[7px]"
              type="password"
              onChange={(e) => setUserPassword(e.target.value)}
              value={password}
            />
            <div className="flex justify-end mt-4 text-xs">
              <Link to="/forgetpass" className="form-text">
                Forget Password?
              </Link>
            </div>
          </div>
          <button
            className="mt-4 text-white bg-[#260026] rounded-full w-2/3"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
