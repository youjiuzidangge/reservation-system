export const mongoUri = 'mongodb://' +
    process.env.MONGO_USER + ':' +
    process.env.MONGO_PASSWORD + '@' +
    process.env.MONGO_HOST + ':' +
    process.env.MONGO_PORT + '/' +
    process.env.MONGO_DB + '?' +
    'authSource=admin' || 'mongodb://localhost:27017/hilton';