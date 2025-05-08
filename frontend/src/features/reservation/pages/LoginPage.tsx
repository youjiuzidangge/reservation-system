import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (token: string, user: { id: string; role: string }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate(user.role === 'guest' ? '/guest' : '/employee');
    };

    return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;