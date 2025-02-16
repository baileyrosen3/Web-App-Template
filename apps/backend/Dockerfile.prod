# Use Node.js 18 alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json only
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Generate Prisma client
RUN npm install -g prisma && \
    npx prisma generate

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "src/index.js"] 