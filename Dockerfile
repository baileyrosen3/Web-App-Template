# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# Copy backend files
COPY apps/backend ./apps/backend

# Install dependencies
RUN pnpm install --frozen-lockfile

# Set working directory to backend
WORKDIR /app/apps/backend

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"] 