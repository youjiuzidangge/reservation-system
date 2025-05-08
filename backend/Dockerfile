# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY backend/src .
COPY backend/package*.json ./
RUN npm install
RUN npm install -g typescript
RUN npm run build

# 生产阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist .

EXPOSE 4000
CMD ["npm", "start"]