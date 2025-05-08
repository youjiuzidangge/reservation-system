import { useState, useEffect } from 'react';
import { GuestReservationForm } from '@/features/reservation/components';
import { getReservations, updateReservation, cancelReservation } from '@/services/api/reservation';
import { ReservationTable } from '../components/ReservationTable';
import { Reservation } from '@/types';
import { useAuth } from '@/hooks/useAuth';

const GuestPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const token = localStorage.getItem('token') || '';
  const { logout } = useAuth();

  const fetchReservations = async () => {
    try {
      const data = await getReservations(token);
      const sortedData = [...data].sort((a, b) => parseInt(a.arrivalTime) - parseInt(b.arrivalTime));
      setReservations(sortedData);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateReservation({ id, status }, token);
      fetchReservations();
    } catch (error) {
      console.error('Failed to update reservation:', error);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelReservation(id, token);
      fetchReservations();
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Guest booking</h2>
        <button 
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <GuestReservationForm 
        token={token} 
        onSuccess={fetchReservations} 
      />
      <h3 className="text-xl font-bold mt-8 mb-4">Your reservation</h3>
      <ReservationTable 
        reservations={reservations} 
        onStatusUpdate={handleStatusUpdate}
        onCancel={handleCancel} 
      />
    </div>
  );
};

export default GuestPage;