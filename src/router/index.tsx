import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '@/features/Auth';
import { Dashboard } from '@/features/Dashboard';
import { UploadDemo } from '@/features/UploadDemo';
import BasicLayout from '@/components/layout/BasicLayout';
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
