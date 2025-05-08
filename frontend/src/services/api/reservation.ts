import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Reservation } from '@/types';
import {
    CREATE_RESERVATION,
    UPDATE_RESERVATION,
    CANCEL_RESERVATION,
    GET_RESERVATIONS,
    GET_RESERVATION,
} from './reservationQueries';

const client = new ApolloClient({
    uri: `${import.meta.env.VITE_API_URL}/graphql`,
    cache: new InMemoryCache(),
});

export const createReservation = async (input: {
    guestName: string;
    phone: string;
    email: string;
    arrivalTime: string;
    tableSize: number;
}, token: string) => {
    const response = await client.mutate({
        mutation: CREATE_RESERVATION,
        variables: { input },
        context: { headers: { Authorization: `Bearer ${token}` } },
        update: (cache) => {
            cache.evict({ fieldName: 'reservations' });
        },
    });
    return response.data.createReservation as Reservation;
};

export const updateReservation = async (input: {
    id: string;
    guestName?: string;
    phone?: string;
    email?: string;
    arrivalTime?: string;
    tableSize?: number;
    status?: string;
}, token: string) => {
    const response = await client.mutate({
        mutation: UPDATE_RESERVATION,
        variables: { input },
        context: { headers: { Authorization: `Bearer ${token}` } },
        update: (cache) => {
            cache.evict({ fieldName: 'reservations' });
        },
    });
    return response.data.updateReservation as Reservation;
};

export const cancelReservation = async (id: string, token: string) => {
    const response = await client.mutate({
        mutation: CANCEL_RESERVATION,
        variables: { id },
        context: { headers: { Authorization: `Bearer ${token}` } },
        update: (cache) => {
            cache.evict({ fieldName: 'reservations' });
        },
    });
    return response.data.cancelReservation as Reservation;
};

export const getReservations = async (token: string, date?: string, status?: string) => {
    const response = await client.query({
        query: GET_RESERVATIONS,
        variables: { date, status },
        context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return response.data.reservations as Reservation[];
};

export const getReservation = async (id: string, token: string) => {
    const response = await client.query({
        query: GET_RESERVATION,
        variables: { id },
        context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return response.data.reservation as Reservation;
};