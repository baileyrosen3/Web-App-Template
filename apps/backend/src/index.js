require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:3000", // Local development
    process.env.FRONTEND_URL || "", // Vercel frontend URL
    "https://your-vercel-frontend-url.vercel.app", // Replace with actual Vercel URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync(); // Sync models
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Railway Backend Server is running!" });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});

module.exports = app;
