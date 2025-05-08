import React from 'react';
import { Reservation } from '@/types';

interface ReservationTableProps {
    reservations: Reservation[];
    onStatusUpdate: (id: string, status: string) => void;
    onCancel: (id: string) => void;
}

export const ReservationTable: React.FC<ReservationTableProps> = ({
    reservations,
    onStatusUpdate,
    onCancel,
}) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">Guest Name</th>
                    <th className="border p-2">Contact</th>
                    <th className="border p-2">Arrival Time</th>
                    <th className="border p-2">Table Size</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((res) => (
                    <tr key={res.id}>
                        <td className="border p-2">{res.guestName}</td>
                        <td className="border p-2">
                            {res.guestContact.phone}<br />
                            {res.guestContact.email}
                        </td>
                        <td className="border p-2">
                            {new Date(Number(res.arrivalTime)).toLocaleString()}
                        </td>
                        <td className="border p-2">{res.tableSize}</td>
                        <td className="border p-2">{res.status}</td>
                        <td className="border p-2">
                            <select
                                onChange={(e) => onStatusUpdate(res.id, e.target.value)}
                                className="border p-1 rounded"
                                defaultValue=""
                            >
                                <option value="" disabled>Change Status</option>
                                <option value="Requested">Requested</option>
                                <option value="Approved">Approved</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <button
                                onClick={() => onCancel(res.id)}
                                className="ml-2 bg-red-500 text-white p-1 rounded"
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};