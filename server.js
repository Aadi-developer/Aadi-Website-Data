// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Step 1: Connect MongoDB
mongoose
  .connect("mongodb://localhost:27017/WebsiteDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB: WebsiteDatabase"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Step 2: Define Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema); // Collection: users

// ✅ Step 3: Form Submit Route
app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newUser = new User({ name, email, message });
    await newUser.save();
    res.json({ message: "Your data stored successfully in Aadi Database ✅😈" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Error saving data ❌" });
  }
});

// ✅ Step 4: Test Route
app.get("/", (req, res) => {
  res.send("Server is running and connected to Aadi Database 🚀");
});

// ✅ Step 5: Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

