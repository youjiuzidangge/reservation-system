import { Reservation } from '@/models/reservation';
import logger from '@/utils/logger';

export const cancelReservation = async (_: any, args: { id: string }, context: any) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            args.id,
            { status: 'Cancelled' },
            { new: true }
        );
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        logger.info(`Reservation cancelled: ${args.id}`);
        return reservation;
    } catch (error) {
        logger.error('Error cancelling reservation:', error);
        throw new Error('Failed to cancel reservation');
    }
};