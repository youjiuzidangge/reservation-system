import { EmployeeDashboard } from '@/features/reservation/components';
import { useAuth } from '@/hooks/useAuth';

const EmployeePage = () => {
    const token = localStorage.getItem('token') || '';
    const { logout } = useAuth();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Employee Dashboard</h2>
                <button 
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            <EmployeeDashboard token={token} />
        </div>
    );
};

export default EmployeePage;