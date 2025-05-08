import { Reservation } from '@/models/reservation';
import logger from '@/utils/logger';
import { UpdateReservationInput } from '@/graphql/types/models/reservation';

export const updateReservation = async (_: any, args: { input: UpdateReservationInput }, context: any) => {
    const { id, status, ...updates } = args.input;
    const updateData: any = { ...updates };
    updateData.status = status;
    try {
        const reservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true });
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        logger.info(`Reservation updated: ${id}`);
        return reservation;
    } catch (error) {
        logger.error('Error updating reservation:', error);
        throw new Error('Failed to update reservation');
    }
};