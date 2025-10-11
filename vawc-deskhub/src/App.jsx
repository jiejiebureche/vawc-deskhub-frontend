import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./screens/LoginForm";
import Cases from "./screens/users/userCases";
import Home from "./screens/users/Home";
import SignUpForm from "./screens/SignUpForm";
import ErrorSection7 from "./screens/404NotFound";
import Settings from "./screens/users/Settings";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<ErrorSection7 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
