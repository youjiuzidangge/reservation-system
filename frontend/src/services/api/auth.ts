import axios from 'axios';
import { User } from '@/types/reservation.d.ts';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const signup = async (email: string, name: string, password: string, role: string) => {
    const response = await api.post('/auth/signup', { email, name, password, role });
    return response.data as { token: string; user: User };
};

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data as { token: string; user: User };
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};