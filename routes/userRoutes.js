const express= require("express");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/userModel");

const router = express.Router();

router.post("/add",async (req,res)=>{
    const {name,email,age} = req.body;
    try {
        const userAdded = await User.create({
            name:name,
            email:email,
            age:age,
        });
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message});
    }
});


router.get("/show", async (req, res) => {
     try {
        const showAll = await User.find();
        res.status(200).json(showAll);
        
     } catch (error) {
        console.log(error);
        res.send(401).json({error:error.message});
     }
        
});

router.get("/showSingle:id", async (req, res) => {
    const {id} = req.params;
    try {
       const showSingle = await User.findById({_id:id});
       res.status(200).json(showSingle);
       
    } catch (error) {
       console.log(error);
       res.send(401).json({error:error.message});
    }
       
});

router.delete("/delete:id", async (req, res) => {
    const {id} = req.params;
    try {
       const userDelete = await User.findByIdAndDelete({_id:id});
       res.status(200).json(userDelete);
        
    } catch (error) {
       console.log(error);
       res.send(401).json({error:error.message});
    }
       
});

router.patch("/update:id", async (req, res) => {
    const {id} = req.params;
    const {name,email,age} =req.body;
    try {
       const userUpadet = await User.findByIdAndUpdate(id,req.body,{new:true,});
       res.status(200).json(userUpadet);
        
    } catch (error) {
       console.log(error);
       res.send(401).json({error:error.message});
    }
       
});


module.exports = router;