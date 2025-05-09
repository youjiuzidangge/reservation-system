# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 安装依赖前先复制 package 文件，加速缓存
COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
COPY ./scripts ./scripts

RUN npm install
RUN npm run build && ls -R /app/dist


# 运行阶段
FROM node:18-alpine

WORKDIR /app

# 拷贝构建产物与依赖
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/tsconfig*.json ./

# 拷贝启动脚本
COPY ./scripts/start.sh ./scripts/start.sh

RUN chmod +x ./scripts/start.sh

EXPOSE 4000

CMD ["./scripts/start.sh"]
