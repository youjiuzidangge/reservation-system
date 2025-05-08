import { Reservation } from '@/models/reservation';
import logger from '@/utils/logger';

export const createReservation = async (_: any, args: { input: any }, context: any) => {
    const { guestName, phone, email, arrivalTime, tableSize } = args.input;
    const reservation = new Reservation({
        guestName,
        guestContact: { phone, email },
        arrivalTime: new Date(arrivalTime),
        tableSize,
        status: 'Requested',
        createdBy: context.currentUser.userId,
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