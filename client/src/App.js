import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./components/RequireAuth";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ActivateAccount from "./components/ActivateAccount";
import Layout from "./components/Layout";
import Home from "./components/Home";
import PersistLogin from "./components/PersistLogin ";

function App() {
  return (
    <>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/activate-account/:token"
            element={<ActivateAccount />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Privet route */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedUsers={["admin"]} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
