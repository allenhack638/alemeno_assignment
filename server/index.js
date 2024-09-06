const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { initializeWebSocket } = require("./services/webSocketService");
const courseRoutes = require("./routes/courseRoutes");
const errorHandler = require("./middleware/errorHandler");
const rateLimit = require("express-rate-limit");

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting (By IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 300, // Limit each IP to 100 requests per `window` (15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Database Connection
connectDB();

// Routes
app.use("/api/courses", courseRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is active" });
});

// Error Handling Middleware
app.use(errorHandler);

// Start server and WebSocket
const server = http.createServer(app);
initializeWebSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
