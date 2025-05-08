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