import { Reservation } from '@/models/reservation';
import logger from '@/utils/logger';
import { QueryReservationsArgs } from '@/graphql/types/query';

export const reservations = async (_: any, args: QueryReservationsArgs, context: any) => {
    const query: any = {};
    if (args.date) {
        const start = new Date(args.date);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        query.arrivalTime = { $gte: start, $lt: end };
    }
    if (args.status) {
        query.status = args.status;
    }
    try {
        return await Reservation.find(query);
    } catch (error) {
        logger.error('Error fetching reservations:', error);
        throw new Error('Failed to fetch reservations');
    }
};