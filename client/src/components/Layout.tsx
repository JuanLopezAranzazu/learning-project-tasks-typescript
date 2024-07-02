import { Outlet } from "react-router-dom";

// Componente para el layout de la aplicación
export const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
