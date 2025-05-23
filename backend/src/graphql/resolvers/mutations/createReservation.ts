import { Reservation } from '@/models/reservation';
import logger from '@/utils/logger';
import { ReservationInput } from '@/graphql/types/models/reservation';

export const createReservation = async (_: any, args: { input: ReservationInput }, context: any) => {
    const { guestName, phone, email, arrivalTime, tableSize } = args.input;

    console.log('context.user:', context.user);
    const reservation = new Reservation({
        guestName,
        guestContact: { phone, email },
        arrivalTime: new Date(arrivalTime),
        tableSize,
        status: 'Requested',
        createdBy: context.user._id,
    });
    try {
        await reservation.save();
        logger.info(`Reservation created: ${reservation.id}`);
        return reservation;
    } catch (error) {
        logger.error('Error creating reservation:', error);
        throw new Error('Failed to create reservation');
    }
};