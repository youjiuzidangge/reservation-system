import { Reservation } from '@/models/reservation';

declare global {
  namespace Express {
    interface Context {
      models: {
        Reservation: typeof Reservation;
      };
      user?: {
        id: string;
        role: 'admin' | 'user';
      };
    }
  }
}

export {};