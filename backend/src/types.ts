export interface User {
    id: string;
    name: string;
    email: string;
    role: 'guest' | 'employee';
}

export interface Reservation {
    id: string;
    guestName: string;
    guestContact: {
        phone: string;
        email: string;
    };
    arrivalTime: string;
    tableSize: number;
    status: 'Requested' | 'Approved' | 'Cancelled' | 'Completed';
    createdBy: string;
}

export interface SignupBody {
    email: string;
    name: string;
    password: string;
    role: 'guest' | 'employee';
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

// Custom Koa context with currentUser
export interface CustomContext {
    currentUser?: {
        userId: string;
        role: 'guest' | 'employee';
    };
}