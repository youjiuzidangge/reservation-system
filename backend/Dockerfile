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

COPY package*.json ./
ENV NODE_ENV=production
RUN npm install --omit=dev

RUN npm install --no-save \
    ts-node \
    tsconfig-paths \
    dotenv \
    @graphql-tools/graphql-file-loader\
    @graphql-tools/load

# 拷贝构建产物与依赖
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/tsconfig*.json ./

# 拷贝启动脚本
COPY ./scripts/start.sh ./scripts/start.sh

RUN chmod +x ./scripts/start.sh

EXPOSE 4000

CMD ["./scripts/start.sh"]
