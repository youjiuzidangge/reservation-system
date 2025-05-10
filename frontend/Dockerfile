FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm install --only=dev
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "preview"]
