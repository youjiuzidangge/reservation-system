import React, { useEffect, useState } from 'react';
import { getReservations, updateReservation, cancelReservation } from '@/services/api/reservation.ts';
import { Reservation } from '@/types';

interface EmployeeDashboardProps {
    token: string;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ token }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [dateFilter, setDateFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [error, setError] = useState('');

    const fetchReservations = async () => {
        try {
            const data = await getReservations(token, dateFilter, statusFilter);
            setReservations(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch reservations');
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [dateFilter, statusFilter]);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await updateReservation({ id, status }, token);
            fetchReservations();
        } catch (err: any) {
            setError(err.message || 'Failed to update reservation');
        }
    };

    const handleCancel = async (id: string) => {
        try {
            await cancelReservation( id, token );
            fetchReservations();
        } catch (err: any) {
            setError(err.message || 'Failed to cancel reservation');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4 flex space-x-4">
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border p-2 rounded"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All Statuses</option>
                    <option value="Requested">Requested</option>
                    <option value="Approved">Approved</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
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
                        <td className="border p-2">{new Date(res.arrivalTime).toLocaleString()}</td>
                        <td className="border p-2">{res.tableSize}</td>
                        <td className="border p-2">{res.status}</td>
                        <td className="border p-2">
                            <select
                                onChange={(e) => handleStatusUpdate(res.id, e.target.value)}
                                className="border p-1 rounded"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Change Status
                                </option>
                                <option value="Requested">Requested</option>
                                <option value="Approved">Approved</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <button
                                onClick={() => handleCancel(res.id)}
                                className="ml-2 bg-red-500 text-white p-1 rounded"
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};