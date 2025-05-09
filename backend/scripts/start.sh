#!/bin/sh

echo "⏳ Waiting for MongoDB to be ready..."
until nc -z "$MONGO_HOST" "$MONGO_PORT"; do
  sleep 2
done

echo "✅ MongoDB is ready."

echo "🚀 Running migrations..."
npm run migrate:up

echo "🌱 Seeding database..."
npm run migrate:seed

echo "🔧 Starting backend server..."
npm start
