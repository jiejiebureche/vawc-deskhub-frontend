import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./screens/LoginForm";
import Cases from "./screens/users/userCases";
import AgentCases from "./screens/agents/agentCases";
import Dashboard from "./screens/agents/dashboard";
import Home from "./screens/users/Home";
import SignUpForm from "./screens/SignUpForm";
import ErrorSection7 from "./screens/404NotFound";
import Settings from "./screens/users/Settings";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Unauthorized from "./Unauthorized";
import ChangePass from "./screens/users/changePass";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={["user"]}>
                  <Home />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={["user"]}>
                  <ChangePass />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/cases"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={["user"]}>
                  <Cases />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/agentcases"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={["agent"]}>
                  <AgentCases />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={["agent"]}>
                  <Dashboard />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={["user"]}>
                  <Settings />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          />

          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<ErrorSection7 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
