import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

interface RoleRouteProps {
    allowedRole: "admin" | "student";
}

/**
 * RoleRoute: Verifica que el usuario autenticado
 * tenga el rol requerido.
 *
 * Si no está autenticado → login.
 * Si está autenticado pero tiene otro rol → su dashboard.
 */
const RoleRoute = ({ allowedRole }: RoleRouteProps) => {

    const { usuario, loading } = useAuth();

    // Todavía estamos comprobando la sesión
    if (loading) {
        return <div>Cargando...</div>;
    }

    // No hay usuario autenticado
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    // Usuario autenticado pero con rol incorrecto
    if (usuario.rol !== allowedRole) {

        const destination =
            usuario.rol === "admin"
                ? "/admin/dashboard"
                : "/student/dashboard";

        return (
            <Navigate
                to={destination}
                replace
            />
        );
    }

    return <Outlet />;
};

export default RoleRoute;