# apps/backend/Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
RUN npm install
COPY . .
RUN npm run build --workspace apps/backend

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
