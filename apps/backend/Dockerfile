# Use Node.js v18 as the base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Generate Prisma client and build
RUN pnpm run prisma:generate && pnpm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install pnpm globally in production
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["pnpm", "start"]