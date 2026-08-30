import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * PrivateRoute: Protege rutas que requieren autenticación.
 * Si no hay un usuario autenticado, redirige al login.
 */
const PrivateRoute = () => {
    const { usuario, loading } = useAuth();

    // Esperamos a que AuthContext compruebe la sesión
    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;