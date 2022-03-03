import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Register from "./pages/Register/Register";
import ActivateAccount from "./components/ActivateAccount";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate-account/:token" element={<ActivateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<RequireAuth allowedUsers={["admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
