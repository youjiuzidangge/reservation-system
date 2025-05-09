import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (token: string, user: { id: string; role: string }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate(user.role === 'guest' ? '/guest' : '/employee');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <LoginForm onLogin={handleLogin} />
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;