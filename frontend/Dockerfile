# 使用 Node.js 20 作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 检查 dist 目录是否存在
RUN ls -R /app/dist

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["npm", "run", "preview"]
