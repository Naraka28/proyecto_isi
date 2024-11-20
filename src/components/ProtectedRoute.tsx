import { Navigate, Outlet } from "react-router-dom";
import { PersistentDrawerLeft } from "./Sidebar"; // Importa tu componente

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Verifica si hay un token en el localStorage

  return token ? (
    <PersistentDrawerLeft>
      <Outlet />
    </PersistentDrawerLeft>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
