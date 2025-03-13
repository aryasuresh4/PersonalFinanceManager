const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/')
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to Personal Finance Manager API");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
