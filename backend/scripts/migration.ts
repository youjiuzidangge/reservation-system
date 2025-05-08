import mongoose from 'mongoose';
import { Reservation } from '../src/models/reservation';
import { User } from '../src/models/user';

const checkAndCreateDatabase = async () => {
  try {
    // 从环境变量读取数据库URI
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hilton';
    const dbName = process.env.MONGO_DB_NAME || 'hilton';

    // 确保数据库连接已建立
    if (!mongoose.connection.readyState) {
      await mongoose.connect(mongoUri, {
        dbName: dbName
      });
    }

    // 检查db是否存在
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    if (!collections.some(c => c.name === 'reservations')) {
      await db.createCollection('reservations');
      console.log('Created reservations collection');
    }

    if (!collections.some(c => c.name === 'users')) {
      await db.createCollection('users');
      console.log('Created users collection');
    }
  } catch (error) {
    console.error('Error checking/creating collections:', error);
    throw error;
  }
};

export const up = async () => {
  try {
    await checkAndCreateDatabase();

    await Reservation.collection.createIndex({ email: 1 });
    await Reservation.collection.createIndex({ arrivalTime: 1 });
    console.log('Created indexes for reservations');

    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ phone: 1 }, { unique: true });
    console.log('Created indexes for users');
  } catch (error) {
    console.error('Error during migration up:', error);
    throw error;
  }
};

export const down = async () => {
  try {
    // 检查db是否存在
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }

    const db = mongoose.connection.db;

    // 删除索引前检查集合是否存在
    const collections = await db.listCollections().toArray();

    if (collections.some(c => c.name === 'reservations')) {
      await db.collection('reservations').dropIndexes();
      console.log('Dropped indexes for reservations');
    }

    if (collections.some(c => c.name === 'users')) {
      await db.collection('users').dropIndexes();
      console.log('Dropped indexes for users');
    }
  } catch (error) {
    console.error('Error during migration down:', error);
    throw error;
  }
};


// 根据命令行参数执行操作
const action = process.argv[2];

switch (action) {
  case 'up':
    up().then(() => process.exit(0)).catch(err => {
      console.error(err);
      process.exit(1);
    });
    break;
  case 'down':
    down().then(() => process.exit(0)).catch(err => {
      console.error(err);
      process.exit(1);
    });
    break;
  default:
    console.error('Usage: npm run migration <up|down>');
    process.exit(1);
}