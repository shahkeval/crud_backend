const express= require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/userRoutes.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.url).
then(()=>{
    console.log("Database connected successfuly.");
    app.listen(process.env.port || 8001,(err)=>{
        if(err) console.log(err);
        console.log("server running at",process.env.port);
    });
}).catch((error)=>{
    console.log("error",error);
})

app.use(userRoute);
