import { RouteObject, Navigate } from 'react-router-dom';
import { LoginPage, GuestPage, EmployeePage, SignupPage } from '@/features/reservation/pages';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
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