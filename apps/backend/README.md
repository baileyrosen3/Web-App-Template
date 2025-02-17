# Backend Server

## Overview
This is a robust Express.js backend server with Prisma ORM, designed for a web application template.

## Features
- User Authentication (Signup, Login, Profile)
- JWT-based Authorization
- Prisma ORM for Database Management
- Input Validation
- Error Handling
- CORS Configuration
- Helmet for Security Headers

## Prerequisites
- Node.js (v16+)
- PostgreSQL
- Prisma CLI

## Environment Setup
1. Copy `.env.example` to `.env`
2. Fill in required environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `PORT`

## Installation
```bash
npm install
npx prisma generate
npm run db:migrate:dev
```

## Running the Server
- Development: `npm run dev`
- Production: `npm start`

## API Endpoints
### Authentication
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: User login
- `GET /api/auth/profile`: Get user profile (requires authentication)

### Posts
- `POST /api/posts`: Create a new post (requires authentication)
- `GET /api/posts`: Fetch published posts

### Utility
- `GET /`: Health check
- `GET /api/db-test`: Database connection test

## Security
- Passwords are hashed using bcrypt
- JWTs are used for authentication
- Input validation for all routes
- CORS configured for specific origins

## Deployment
- Ensure all environment variables are set
- Run database migrations before starting the server
- Use a process manager like PM2 for production

## Troubleshooting
- Check `.env` file configuration
- Verify database connection
- Ensure all dependencies are installed 