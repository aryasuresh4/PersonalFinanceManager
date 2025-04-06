
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));



//  connect Router
app.use("/api/transactions", transactionRoutes); 
app.use("/api/auth", userRoutes);


app.get("/", (req, res) => {
        res.send("API is running...");
      });

//connectDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connected to db')
})
.catch ((err)=>
    console.error(`Error: ${error.message}`));


//listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
