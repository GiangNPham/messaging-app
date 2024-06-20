import { Navigate, Outlet } from "react-router-dom";

const RouteGuard = () => {
  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  return <Outlet />;
};

export default RouteGuard;
