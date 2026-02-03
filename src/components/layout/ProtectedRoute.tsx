import { useAuthStore } from '@/store/authStore';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  return <Outlet />;
}
