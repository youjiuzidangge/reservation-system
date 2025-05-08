import { connectDB, closeDB } from '@/config/db';
import { Reservation } from '../src/models/reservation';
import { User } from '../src/models/user';
import {hashPassword} from "../src/utils/auth";

const seedData = async () => {
  try {
    await connectDB();

    // 清空现有数据
    await Reservation.deleteMany({});
    await User.deleteMany({});
    console.log('Clear collections');


    // 插入用户数据
    const users = [
      {
        email: 'john@example.com',
        phone: '1234567890',
        password: await hashPassword("111111"), // 实际使用中应使用hashPassword函数
        name: 'John Doe',
        role: 'guest'
      },
      {
        email: 'employee@example.com',
        phone: '11111111',
        password: await hashPassword("111111"), // 实际使用中应使用hashPassword函数
        name: 'Employee User',
        role: 'employee'
      }
    ];

    const createdUsers = await User.insertMany(users);

    // 插入预订数据
    const reservations = [
      {
        guestName: 'John Doe',
        guestContact: {
          phone: '1234567890',
          email: 'john@example.com'
        },
        arrivalTime: new Date('2025-04-01T12:00:00'),
        tableSize: 4,
        status: 'Requested',
        createdBy: createdUsers[0]._id
      },
      {
        guestName: 'Jane Smith',
        guestContact: {
          phone: '0987654321',
          email: 'jane@example.com'
        },
        arrivalTime: new Date('2025-04-01T18:00:00'),
        tableSize: 2,
        status: 'Approved',
        createdBy: createdUsers[1]._id
      }
    ];

    await Reservation.insertMany(reservations);
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await closeDB();
  }
};

seedData();