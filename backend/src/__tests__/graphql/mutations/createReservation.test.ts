import request from 'supertest';
import { createServer } from '@/server';
import { Reservation } from '@/models/reservation';
import { User } from '@/models/user';

const { httpServer } = createServer();

describe('Mutation: createReservation', () => {
  beforeAll(async () => {
    await User.create({
      name: 'John',
      email: 'john@example.com',
      password: 'password123',
      phone: '1234567890',
      role: 'guest'
    });
  });

  afterAll(async () => {
    await Reservation.deleteMany({});
  });

  it('should create new reservation with valid input', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({ 
        query: `mutation CreateReservation($input: ReservationInput!) {
          createReservation(input: $input) {
            id
            status
            createdBy
          }
        }`,
        variables: {
          input: {
            guestName: "test user",
            phone: "13800138000",
            email: "guest@example.com",
            arrivalTime: "2024-06-01T18:00:00.000Z",
            tableSize: 4
          }
        }
      });

    console.log('1111111111111111111111111111')
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.data.createReservation.status).toBe('Requested');
    
    const created = await Reservation.findById(res.body.data.createReservation.id);
    expect(created?.guestName).toBe('test user');
  });
});