import request from 'supertest';
import { createServer } from '@/server';
import { Reservation } from '@/models/reservation';

const { httpServer } = createServer();

describe('Query: reservations', () => {
  beforeAll(async () => {
    await Reservation.create([
      {
        guestName: "userA",
        guestContact: { phone: "13800138000", email: "a@example.com" },
        arrivalTime: new Date("2024-06-01T18:00:00.000Z"),
        tableSize: 2,
        status: "Requested",
        createdBy: "test_user"
      },
      {
        guestName: "userB",
        guestContact: { phone: "13800138001", email: "b@example.com" },
        arrivalTime: new Date("2024-06-02T19:00:00.000Z"),
        tableSize: 4,
        status: "Requested",
        createdBy: "test_user"
      }
    ]);
  });

  afterAll(async () => {
    await Reservation.deleteMany({});
  });

  it('should fetch all reservations', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `query Reservations {
          reservations {
            guestName
            tableSize
          }
        }`
      });

    expect(res.status).toBe(200);
    expect(res.body.data.reservations).toHaveLength(2);
  });

  it('should filter by date', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `query FilterReservations($date: String!) {
          reservations(date: $date) {
            guestName
          }
        }`,
        variables: { date: "2024-06-01" }
      });

    expect(res.body.data.reservations[0].guestName).toBe("userA");
  });
});