FROM node:20-slim

# Install pnpm and system dependencies
RUN npm install -g pnpm && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    postgresql-client \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# First, copy just package.json files
COPY package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/

# Initialize workspace and install dependencies
RUN printf 'packages:\n  - "apps/*"\n' > pnpm-workspace.yaml && \
    pnpm install

# Now copy the rest of the application
COPY . .

# Generate Prisma client and build applications
RUN cd apps/backend && \
    pnpm prisma generate && \
    pnpm build && \
    cd ../frontend && \
    NEXT_PUBLIC_API_URL=http://localhost:8080 npm run build

# Expose ports
EXPOSE 3000 8080

# Start development servers
CMD ["pnpm", "dev"] 