import { Navigate, Outlet } from 'react-router';

interface RoleRouteProps {
  allowedRole: 'admin' | 'student'
}

/**
 * RoleRoute: Verifica que el usuario autenticado tenga el rol requerido.
 * Si el rol no coincide, redirige al dashboard que le corresponde.
 * Si no hay token, redirige al login.
*/
const RoleRoute = ({ allowedRole }: RoleRouteProps) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (rol !== allowedRole) {
    const destination = rol === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
