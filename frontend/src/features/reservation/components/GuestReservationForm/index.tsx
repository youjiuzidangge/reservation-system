import { useState } from 'react';
import { createReservation, updateReservation } from '@/services/api/reservation.ts';
import { Reservation } from '@/types';

interface GuestReservationFormProps {
    token: string;
    existingReservation?: Reservation;
    onSuccess: () => void;
}

export const GuestReservationForm: React.FC<GuestReservationFormProps> = ({
                                                                              token,
                                                                              existingReservation,
                                                                              onSuccess,
                                                                          }) => {
    const [guestName, setGuestName] = useState(existingReservation?.guestName || '');
    const [phone, setPhone] = useState(existingReservation?.guestContact.phone || '');
    const [email, setEmail] = useState(existingReservation?.guestContact.email || '');
    const [arrivalTime, setArrivalTime] = useState(
        existingReservation?.arrivalTime.slice(0, 16) || ''
    );
    const [tableSize, setTableSize] = useState(existingReservation?.tableSize || 2);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (existingReservation) {
                await updateReservation(
                    {
                        id: existingReservation.id,
                        guestName,
                        phone,
                        email,
                        arrivalTime,
                        tableSize,
                    },
                    token
                );
            } else {
                await createReservation(
                    { guestName, phone, email, arrivalTime, tableSize },
                    token
                );
            }
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Operation failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                {existingReservation ? 'Update Reservation' : 'Make Reservation'}
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Guest Name</label>
                    <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Phone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Arrival Time</label>
                    <input
                        type="datetime-local"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Table Size</label>
                    <input
                        type="number"
                        value={tableSize}
                        onChange={(e) => setTableSize(Number(e.target.value))}
                        className="w-full border p-2 rounded"
                        min="1"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {existingReservation ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
};