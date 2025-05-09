import request from 'supertest';
import { createServer } from '@/server';
import { Reservation } from '@/models/reservation';

const { httpServer } = createServer();

describe('Query: reservation', () => {
  let reservationId: string;

  beforeAll(async () => {
    const reservation = await Reservation.create({
      guestName: "test_user",
      guestContact: { phone: "13800138000", email: "query@example.com" },
      arrivalTime: new Date("2024-06-01T18:00:00.000Z"),
      tableSize: 4,
      status: "Approved",
      createdBy: "test_user"
    });
    reservationId = reservation.id.toString();
  });

  afterAll(async () => {
    await Reservation.deleteMany({});
  });

  it('should fetch single reservation by ID', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `query GetReservation($id: ID!) {
          reservation(id: $id) {
            id
            guestName
            tableSize
          }
        }`,
        variables: { id: reservationId }
      });

    expect(res.status).toBe(200);
    expect(res.body.data.reservation.id).toBe(reservationId);
  });
});