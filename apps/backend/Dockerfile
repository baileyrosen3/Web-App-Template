# Use official Node.js LTS image
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["pnpm", "dev"] 