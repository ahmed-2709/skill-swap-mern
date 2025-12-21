const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: "https://skill-swap-mern.vercel.app",        
  credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const privateRoutes = require("./routes/privateRoutes");
app.use("/api/private", privateRoutes);

const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

const requestRoutes = require("./routes/requestRoutes");
app.use("/api/requests", requestRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("SkillSwap API is running");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { serverApi: { version: '1', strict: true, deprecationErrors: true } })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
  });
