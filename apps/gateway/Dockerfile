FROM node:18-alpine

WORKDIR /app

# Copy root package files if any
COPY package*.json ./
# Copy workspace packages
COPY apps/gateway ./apps/gateway
COPY packages/shared-proto ./packages/shared-proto

WORKDIR /app/apps/gateway
RUN npm install

EXPOSE 4000
EXPOSE 8080

CMD ["node", "src/index.js"]
