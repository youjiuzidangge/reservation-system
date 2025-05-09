import request from 'supertest';
import { createServer } from '@/server';
import { Reservation } from '@/models/reservation';

const { httpServer } = createServer();

describe('Mutation: updateReservation', () => {
  let reservationId: string;
  let token: string;

  beforeAll(async () => {
    // 创建测试预约
    const reservation = await Reservation.create({
      guestName: "初始用户",
      guestContact: { phone: "13800138000", email: "init@example.com" },
      arrivalTime: new Date("2024-06-01T18:00:00.000Z"),
      tableSize: 2,
      status: "Requested",
      createdBy: "test_user"
    });
    reservationId = reservation.id.toString();
  });

  afterAll(async () => {
    await Reservation.deleteMany({});
  });

  it('should update reservation details', async () => {
    const res = await request(httpServer)
      .post('/graphql')
      .send({
        query: `mutation UpdateReservation($input: UpdateReservationInput!) {
          updateReservation(input: $input) {
            id
            guestName
            tableSize
          }
        }`,
        variables: {
          input: {
            id: reservationId,
            guestName: "NewUserName",
            tableSize: 4
          }
        }
      });

    expect(res.status).toBe(200);
    expect(res.body.data.updateReservation.guestName).toBe('NewUserName');
    
    const updated = await Reservation.findById(reservationId);
    expect(updated?.guestName).toBe('NewUserName');
  });
});