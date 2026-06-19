# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy client and server packages
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies for both
RUN npm install --prefix server
RUN npm install --prefix client

# Copy source code
COPY client/tsconfig.json ./client/
COPY client/index.html ./client/
COPY client/src ./client/src
COPY client/public ./client/public

COPY server/tsconfig.json ./server/
COPY server/src ./server/src
COPY server/prisma ./server/prisma

# Build client
RUN npm run build --prefix client

# Build server
RUN npm run build --prefix server

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy root package
COPY package*.json ./

# Copy server package and built files
COPY server/package*.json ./server/
RUN npm ci --prefix server --only=production

# Copy built server
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/prisma ./server/prisma

# Copy built client
COPY --from=builder /app/client/dist ./client/dist

# Expose port
EXPOSE 3001

# Run migrations and start server
CMD ["sh", "-c", "cd server && npx prisma migrate deploy && cd .. && node server/dist/server.js"]
