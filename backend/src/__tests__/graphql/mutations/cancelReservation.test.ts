import request from 'supertest';
import { createServer } from '@/server';
import { Reservation } from '@/models/reservation';

const { httpServer } = createServer();

describe('Mutation: cancelReservation', () => {
  let reservationId: string;

  beforeAll(async () => {
    const testReservation = await Reservation.create({
      guestName: "Test User",
      guestContact: {
        phone: "13800138000",
        email: "test@example.com"  // 修复email格式
      },
      arrivalTime: new Date("2024-06-01T18:00:00.000Z"),
      tableSize: 2,
      status: "Requested",
      createdBy: "John",
    });

    reservationId = testReservation.id.toString();  // 使用正确的_id字段
  });

  afterAll(async () => {
    await Reservation.deleteMany({});
  });

  it('should cancel reservation', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({ 
        query: `mutation CancelReservation($id: ID!) {
          cancelReservation(id: $id) {
            id
            status
          }
        }`,
        variables: { id: reservationId }
      });
    
    expect(res.status).toBe(200);
    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.cancelReservation.status).toBe('Cancelled');
    
    const updated = await Reservation.findById(reservationId);
    console.log('Database record:', updated);
    expect(updated?.status).toBe('Cancelled');
  });
});