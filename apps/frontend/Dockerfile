# apps/frontend/Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/
RUN npm install
COPY . .
RUN npm run build --workspace apps/frontend

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY apps/frontend/package*.json ./
EXPOSE 3000
CMD ["npm", "run", "start"]
