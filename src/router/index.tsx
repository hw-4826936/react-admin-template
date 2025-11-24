import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@/pages/login';
import Dashboard from '@/pages/dashboard';
import UploadDemo from '@/pages/upload-demo';
import BasicLayout from '@/layouts/BasicLayout';
import AuthGuard from './AuthGuard';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <BasicLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/upload-demo',
        element: <UploadDemo />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);

export default router;
