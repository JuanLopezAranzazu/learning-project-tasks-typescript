import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootAuthState } from "../reducers/auth";

// Componente para proteger páginas públicas
export function PublicPage() {
  const { user } = useSelector((state: RootAuthState) => state.auth);
  const location = useLocation();

  return !user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
