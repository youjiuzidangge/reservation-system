import { Reservation } from '@/models/reservation';
import logger from '@/utils/logger';
import { UpdateReservationInput } from '@/graphql/types/models/reservation';

export const updateReservation = async (_: any, args: { input: UpdateReservationInput }, context: any) => {
    const { id, status, ...updates } = args.input;
    const updateData: any = { ...updates };
    console.log(context.user)
    if (status && context.user.role === 'employee') {
        updateData.status = status;
    }

    console.log("11111111111111111111111111111111");
    console.log(updateData);
    console.log("args.input:", args.input);
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