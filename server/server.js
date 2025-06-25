const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const mockupRoutes = require("./routes/mockupRoutes");
const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/mockups", mockupRoutes);
app.use("/api/stories", storyRoutes);

// ✅ Serve static React files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Fallback for React router (e.g., React Router DOM)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
