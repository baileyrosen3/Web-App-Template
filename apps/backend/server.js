const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

dotenv.config();

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://web-app-template-kappa.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: ['Content-Length', 'Content-Type']
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Add Prisma to request object
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Basic Health Check
app.get('/', (req, res) => {
  console.log('Health check endpoint hit');
  res.status(200).send('OK');
});

// API Base Route
app.get('/api', (req, res) => {
  res.json({
    message: 'API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      dbTest: '/api/db-test'
    }
  });
});

// Import and use route modules
const { router: authRouter, authenticateToken } = require('./routes/auth');
const postsRouter = require('./routes/posts');

app.use('/api/auth', authRouter);
app.use('/api/posts', authenticateToken, postsRouter);

// Database Test Route
app.get('/api/db-test', async (req, res) => {
  try {
    console.log('Attempting database connection...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Database Host:', process.env.PGHOST);
    console.log('Database Name:', process.env.PGDATABASE);
    console.log('Database User:', process.env.PGUSER);
    console.log('Database Port:', process.env.PGPORT);
    
    await prisma.$connect();
    const userCount = await prisma.user.count();
    
    console.log('Database connection successful');
    console.log('User count:', userCount);
    
    res.json({
      status: 'Database connected',
      userCount,
      environment: process.env.NODE_ENV,
      host: process.env.PGHOST
    });
  } catch (error) {
    console.error('Database connection error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Database connection failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message
  });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log('==================================');
  console.log(`Server starting...`);
  console.log(`Port: ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Time: ${new Date().toISOString()}`);
  
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
  
  console.log('==================================');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app; 