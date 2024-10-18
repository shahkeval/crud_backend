const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/userModel");

const router = express.Router();

// POST /add
router.post("/add", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded); // Use status and json chaining correctly
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message }); // Correct status handling
  }
});

// GET /
router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll); // Use status and json chaining correctly
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message }); // Correct status handling
  }
});

// GET /showSingle/:id
router.get("/showSingle/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const showSingle = await User.findById(id);
    if (!showSingle) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(showSingle); // Use status and json chaining correctly
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message }); // Correct status handling
  }
});

// DELETE /delete/:id
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userDelete = await User.findByIdAndDelete(id);
    if (!userDelete) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted", user: userDelete }); // Correct response format
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message }); // Correct status handling
  }
});

// PATCH /update/:id
router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userUpdate = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!userUpdate) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(userUpdate); // Correct status handling and chaining
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message }); // Correct status handling
  }
});

module.exports = router;
