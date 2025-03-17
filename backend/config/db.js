// const mongoose = require("mongoose");
// require("dotenv").config(); // Load .env variables

// const MONGO_URI = process.env.MONGO_URI; // Read MongoDB URI from .env

// if (!MONGO_URI) {
//   console.error("❌ MongoDB URI is missing. Check your .env file!");
//   process.exit(1); // Stop execution if URI is missing
// }

// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// module.exports = mongoose;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

