import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { routes } from './routeConfig.tsx';

// 定义需要认证的路由
const PROTECTED_ROUTES = {
  GUEST: '/guest',
  EMPLOYEE: '/employee'
};

export const AppRoutes = () => {
  const { isAuthenticated, hasRole } = useAuth();

  const renderRouteElement = (path: string, element: React.ReactNode) => {
    // 检查是否是受保护的路由
    const isProtectedRoute = Object.values(PROTECTED_ROUTES).includes(path);
    
    if (!isProtectedRoute) {
      return element;
    }

    // 如果是受保护的路由，但用户未认证，重定向到登录页
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }

    // 获取所需角色（去掉前导斜杠）
    const requiredRole = path.substring(1);
    
    // 检查用户是否有所需角色
    return hasRole(requiredRole) ? element : <Navigate to="/login" />;
  };

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.path ? renderRouteElement(route.path, route.element) : route.element}
        />
      ))}
    </Routes>
  );
};