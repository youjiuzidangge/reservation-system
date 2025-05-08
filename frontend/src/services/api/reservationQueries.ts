import { gql } from '@apollo/client';

export const CREATE_RESERVATION = gql`
    mutation CreateReservation($input: ReservationInput!) {
        createReservation(input: $input) {
            id
            guestName
            guestContact { phone email }
            arrivalTime
            tableSize
            status
        }
    }
`;

export const UPDATE_RESERVATION = gql`
    mutation UpdateReservation($input: UpdateReservationInput!) {
        updateReservation(input: $input) {
            id
            guestName
            guestContact { phone email }
            arrivalTime
            tableSize
            status
        }
    }
`;

export const CANCEL_RESERVATION = gql`
    mutation CancelReservation($id: ID!) {
        cancelReservation(id: $id) {
            id
            status
        }
    }
`;

export const GET_RESERVATIONS = gql`
    query Reservations($date: String, $status: String) {
        reservations(date: $date, status: $status) {
            id
            guestName
            guestContact { phone email }
            arrivalTime
            tableSize
            status
        }
    }
`;

export const GET_RESERVATION = gql`
    query Reservation($id: ID!) {
        reservation(id: $id) {
            id
            guestName
            guestContact { phone email }
            arrivalTime
            tableSize
            status
        }
    }
`;