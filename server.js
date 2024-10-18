const express= require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/userRoutes.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.url, {
   
    serverSelectionTimeoutMS: 30000,  // Increase the timeout to 30 seconds
    socketTimeoutMS: 45000,           // Increase socket timeout if needed
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

app.use(userRoute);
module.exports = app;
