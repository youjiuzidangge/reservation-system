import { RouteObject, Navigate } from 'react-router-dom';
import { LoginPage, GuestPage, EmployeePage } from '@/features/reservation/pages';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/guest',
    element: <GuestPage />,
  },
  {
    path: '/employee',
    element: <EmployeePage />,
  },
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
];