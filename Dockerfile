FROM node:22-alpine

WORKDIR /app

COPY backend/package*.json ./
COPY backend/prisma ./prisma

RUN npm install

COPY backend/. .

EXPOSE 5000

CMD ["npm", "start"]
