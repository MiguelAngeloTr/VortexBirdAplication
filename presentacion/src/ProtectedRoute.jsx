import { Navigate, Outlet } from "react-router-dom";
import { useTasks } from "./context/Context";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useTasks();

  console.log(loading, isAuthenticated);
  
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/" replace />;
  return <Outlet />;
};