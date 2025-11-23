# apps/backend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package metadata and tsconfig
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY src ./src

# Build the NestJS app
RUN npm run build

# ---- Runtime image ----
FROM node:20-alpine

WORKDIR /app

# Copy package files & built dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --omit=dev

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/main.js"]
