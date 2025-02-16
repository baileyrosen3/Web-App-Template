// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { PrismaClient } = require("@prisma/client");
// const authRoutes = require("./routes/auth");

// // Immediate startup logging
// console.log("=== APPLICATION STARTUP ===");
// console.log("Node Version:", process.version);
// console.log("Current Directory:", process.cwd());
// console.log("Environment Variables:");
// console.log("- NODE_ENV:", process.env.NODE_ENV);
// console.log("- PORT:", process.env.PORT);
// console.log("- DATABASE_URL exists:", !!process.env.DATABASE_URL);
// console.log("- POSTGRES_HOST exists:", !!process.env.POSTGRES_HOST);
// console.log("========================");

// // Initialize Express without database connection
// const app = express();
// const PORT = process.env.PORT || 8080;

// // Basic middleware setup
// app.use(express.json());

// // Simple health check endpoint that doesn't depend on database
// app.get(["/", "/health"], (req, res) => {
//   res.status(200).json({
//     status: "service_up",
//     timestamp: new Date().toISOString(),
//     checks: {
//       server: "up",
//       database: "initializing"
//     }
//   });
// });

// // Initialize database connection
// let prisma = null;
// try {
//   console.log("Initializing Prisma client...");
//   prisma = new PrismaClient();
//   console.log("Prisma client initialized successfully");
// } catch (error) {
//   console.error("Failed to initialize Prisma client:", error);
// }

// // CORS Configuration with proper origin handling
// const allowedOrigins = [
//   "https://web-app-template-kappa.vercel.app",
//   "http://localhost:3000",
// ];

// const isDevelopment = process.env.NODE_ENV === "development";

// const corsOptions = {
//   origin: function (origin, callback) {
//     // In development, allow all origins
//     if (isDevelopment) {
//       return callback(null, true);
//     }

//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);

//     // Allow all Vercel preview deployments
//     if (origin.match(/https:\/\/.*\.vercel\.app$/)) {
//       return callback(null, true);
//     }

//     // Check if the origin is in the allowed list
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg =
//         "The CORS policy for this site does not allow access from the specified Origin.";
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
//   optionsSuccessStatus: 204,
//   preflightContinue: false
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));

// // Handle preflight requests
// app.options("*", cors(corsOptions));

// // Routes
// app.use("/api/auth", authRoutes);

// // Root API endpoint
// app.get("/api", (req, res) => {
//   res.json({ message: "Railway Backend Server is running!" });
// });

// // Database test endpoint
// app.get("/api/db-test", async (req, res) => {
//   try {
//     await prisma.$connect();
//     const dbConfig = {
//       host: process.env.PGHOST || process.env.DB_HOST,
//       port: process.env.PGPORT || process.env.DB_PORT,
//       database: process.env.POSTGRES_DB || process.env.DB_NAME,
//       user: process.env.POSTGRES_USER || process.env.DB_USERNAME,
//       // Not sending password for security
//     };
//     res.json({
//       status: "Database connection successful",
//       config: dbConfig,
//       databaseUrl: process.env.DATABASE_URL ? "Configured" : "Not configured",
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Database connection failed",
//       error: error.message,
//     });
//   }
// });

// // Connect to database and start server
// const startServer = async () => {
//   console.log("Starting server initialization...");
  
//   return new Promise((resolve, reject) => {
//     try {
//       // Start HTTP server first
//       const server = app.listen(PORT, () => {
//         console.log(`HTTP server listening on port ${PORT}`);
        
//         // Update health check to include database status
//         app.get(["/", "/health"], (req, res) => {
//           res.status(200).json({
//             status: "healthy",
//             timestamp: new Date().toISOString(),
//             checks: {
//               server: "up",
//               database: prisma ? "connected" : "disconnected"
//             }
//           });
//         });
        
//         resolve(server);
//       });

//       server.on('error', (error) => {
//         console.error("Server error occurred:", error);
//         reject(error);
//       });
      
//     } catch (error) {
//       console.error("Failed to start server:", error);
//       reject(error);
//     }
//   });
// };

// // Attempt database connection after server starts
// const connectDatabase = async () => {
//   if (!prisma) {
//     console.log("Skipping database connection as Prisma client failed to initialize");
//     return;
//   }

//   try {
//     console.log("Attempting database connection...");
//     await prisma.$connect();
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection error:", error);
//     console.log("Database configuration:");
//     console.log({
//       host: process.env.POSTGRES_HOST || process.env.PGHOST,
//       port: process.env.POSTGRES_PORT || process.env.PGPORT,
//       database: process.env.POSTGRES_DB || process.env.POSTGRES_DATABASE,
//       user: process.env.POSTGRES_USER,
//       url_configured: !!process.env.DATABASE_URL
//     });
//   }
// };

// // Global error handlers
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });

// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error);
// });

// // Start application
// console.log("Initiating application startup sequence...");
// startServer()
//   .then(() => connectDatabase())
//   .then(() => {
//     console.log("Application startup completed");
//   })
//   .catch(error => {
//     console.error("Fatal error during startup:", error);
//     process.exit(1);
//   });

// module.exports = app;
