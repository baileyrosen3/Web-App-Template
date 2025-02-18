FROM node:20-slim

# Install pnpm
RUN npm install -g pnpm

# Install system dependencies including build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN cd apps/backend && pnpm prisma generate

# Build applications
RUN pnpm -r run build

# Expose ports
EXPOSE 3000 8080

# We'll override this with docker-compose
CMD ["pnpm", "dev"] 