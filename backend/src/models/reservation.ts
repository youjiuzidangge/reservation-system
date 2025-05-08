import mongoose, { Schema } from 'mongoose';

export interface IReservation extends mongoose.Document {
  guestName: string;
  guestContact: {
    phone: string;
    email: string;
  };
  arrivalTime: Date;
  tableSize: number;
  status: 'Requested' | 'Approved' | 'Cancelled' | 'Completed';
  createdBy: string;
}

const reservationSchema = new Schema<IReservation>({
  guestName: { type: String, required: true },
  guestContact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  arrivalTime: { type: Date, required: true },
  tableSize: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Requested', 'Approved', 'Cancelled', 'Completed'],
    default: 'Requested',
  },
  createdBy: { type: String, required: true },
});

export const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);