import { Navigate, Outlet } from 'react-router';

/**
 * PrivateRoute: Protege rutas que requieren autenticación.
 * Si no hay token en localStorage, redirige al login.
*/
const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />;
}

export default PrivateRoute;
