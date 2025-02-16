const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

console.log("Starting minimal server...");
console.log("Environment:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PWD: process.cwd()
});

// CORS Configuration
const corsOptions = {
  origin: [
    "https://web-app-template-kappa.vercel.app",
    "http://localhost:3000",
    /https:\/\/.*\.vercel\.app$/  // Allow all Vercel preview deployments
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Basic health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// API test endpoint
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

// Database test endpoint
app.get("/api/db-test", (req, res) => {
  res.json({ 
    status: "Database check endpoint responding",
    config: {
      database_url: !!process.env.DATABASE_URL,
      postgres_host: !!process.env.POSTGRES_HOST,
      node_env: process.env.NODE_ENV
    }
  });
});

// Start server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Minimal server running on port ${PORT}`);
  console.log("Available routes:");
  console.log("- GET / (health check)");
  console.log("- GET /api (API test)");
  console.log("- GET /api/db-test (Database config test)");
});

// Add error handler
server.on('error', (error) => {
  console.error("Server error occurred:", error);
}); 