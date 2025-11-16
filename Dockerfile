FROM node:22-slim AS base

WORKDIR /usr/src/app

# Install system dependencies (libssl, openssl, libpq)
RUN apt-get update && apt-get install -y \
    openssl \
    libssl-dev \
    libpq-dev \
    ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate || echo "Prisma not used, skipping generate"

EXPOSE 3000
CMD ["npm", "run", "start"]
