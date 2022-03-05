import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ allowedUsers }) {
  const { auth } = useAuth();
  const location = useLocation();
  
  return allowedUsers?.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.length ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
