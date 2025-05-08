import { Reservation } from '@/models/reservation';
import logger from '@/utils/logger';
import { QueryReservationArgs } from '@/graphql/types/query';

export const reservation = async (_: any, args: QueryReservationArgs, context: any) => {
    try {
        return await Reservation.findById(args.id);
    } catch (error) {
        logger.error('Error fetching reservation:', error);
        throw new Error('Failed to fetch reservation');
    }
};