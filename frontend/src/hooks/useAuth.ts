import { useNavigate } from 'react-router-dom';
import { logout } from '@/services/api/auth';

export const useAuth = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error('登出失败:', error);
        }
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    const getUser = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    };

    const hasRole = (requiredRole: string) => {
        const user = getUser();
        return user?.role === requiredRole;
    };

    return {
        logout: handleLogout,
        isAuthenticated,
        getUser,
        hasRole
    };
};