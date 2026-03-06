FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend
RUN npm install

# Build Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
