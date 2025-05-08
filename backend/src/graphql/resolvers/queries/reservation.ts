import { Reservation } from '@/models/reservation';
import logger from '@/utils/logger';

export const reservation = async (_: any, args: { id: string }, context: any) => {
    try {
        return await Reservation.findById(args.id);
    } catch (error) {
        logger.error('Error fetching reservation:', error);
        throw new Error('Failed to fetch reservation');
    }
};