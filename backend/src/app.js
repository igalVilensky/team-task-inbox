// src/app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Basic middleware only
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Team Task Inbox API",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", routes);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

module.exports = app;
