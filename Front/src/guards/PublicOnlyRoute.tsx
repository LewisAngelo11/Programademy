import { Navigate, Outlet } from 'react-router';

/**
 * PublicOnlyRoute: Bloquea rutas públicas (login, registro, etc.)
 * cuando el usuario ya tiene sesión activa.
 * Redirige al dashboard correspondiente según el rol.
*/
const PublicOnlyRoute = () => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (token) {
    const destination = rol === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
