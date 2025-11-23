# apps/frontend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json (and lockfile if you have it)
COPY package*.json ./

# Install dependencies
RUN npm install
# Install dependencies (ignore peer dependency conflicts)
# RUN npm install --legacy-peer-deps


# Copy rest of frontend sources
COPY . .

# Build Next.js app
RUN npm run build

# ---- Runtime image ----
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy only what we need to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.* ./ 2>/dev/null || true

EXPOSE 3000

CMD ["npm", "run", "start"]
