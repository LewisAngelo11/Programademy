import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * PublicOnlyRoute: Bloquea rutas públicas cuando
 * el usuario ya tiene una sesión activa.
 *
 * Redirige al dashboard correspondiente según el rol.
 */
const PublicOnlyRoute = () => {

    const { usuario, loading } = useAuth();

    // Esperar a que se determine si existe una sesión
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Ya existe una sesión
    if (usuario) {

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

export default PublicOnlyRoute;